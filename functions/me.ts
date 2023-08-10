import { HandlerEvent, HandlerContext } from "@netlify/functions";
import clerk from '@clerk/clerk-sdk-node';
import { getDb } from "./utils/lib";
import { eq } from "drizzle-orm";
import { blocks, users } from "./utils/db/schema";

type PostBody = {
  tagline: string
  blocks: {
    id?: number
    block_type: number
    label?: string
    url: string
  }[]
}

const handler = async (event: HandlerEvent, context: HandlerContext) => {
  let token;
  if(event.headers["cookie"]) {
    const spl = event.headers["cookie"].split("; ")
    spl.forEach(el => {
      if(el.startsWith("__session=")) {
        const spl2 = el.split("__session=")
        if(spl2.length === 2) {
          token = spl2[1]
        }
      }
    })
  }

  if(!token) {
    return {
      statusCode: 401
    }
  }

  const claims = await clerk.verifyToken(token)
  if(claims == null || claims.sub == null) {
    return {
      statusCode: 401
    }
  }

  const user = await clerk.users.getUser(claims.sub)
  if(user == null || user.username == null) {
    return {
      statusCode: 401
    }
  }

  if(event.httpMethod === "GET") {
    const db = getDb()
    const userAndBlocks = await db.query.users.findFirst({
      where: eq(users.username, user.username),
      with: {
        blocks: true
      }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(userAndBlocks)
    }
  }

  if(event.httpMethod === "POST") {
    if(!event.body) {
      return {
        statusCode: 400
      }
    }
    
    const body: PostBody = JSON.parse(event.body)
    
    const db = getDb()
    const dbuser = await db.query.users.findFirst({
      where: eq(users.username, user.username)
    });

    if(dbuser) {

      const promises = [
        db.update(users).set({ tagline: body.tagline }).where(eq(users.id, dbuser.id))
      ]
  
      body.blocks.forEach(b => {
        if(b.id) {
          promises.push(db.update(blocks).set({
            block_type: b.block_type,
            label: b.label,
            url: b.url
          }).where(eq(blocks.id, b.id)))
        } else {
          promises.push(db.insert(blocks).values({
            block_type: b.block_type,
            label: b.label,
            url: b.url,
            user_id: dbuser?.id
          }))
        }
      })

      await Promise.all(promises)

      return {
        statusCode: 200
      }
    }
  }
};

export { handler };