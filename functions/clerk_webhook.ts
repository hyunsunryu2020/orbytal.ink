import { HandlerEvent, HandlerContext } from "@netlify/functions";
import { getDb } from "./utils/lib";
import { blocks, users } from "./utils/db/schema";
import { eq } from "drizzle-orm";

type ClerkWebhook = {
  data: {
    first_name: string
    last_name: string
    image_url: string
    username: string
  }
  type: string
}


const handler = async (event: HandlerEvent, context: HandlerContext) => {
  if(event.body) {
    const webhook = JSON.parse(event.body) as ClerkWebhook;
    try {
      const db = getDb()
  
      if(webhook.type === "user.updated") {
        await db.update(users).set({
          display_name: `${webhook.data.first_name} ${webhook.data.last_name}`,
          img_url: webhook.data.image_url,
        }).where(eq(users.username, webhook.data.username));
      }
  
      if(webhook.type === "user.created") {
        await db.insert(users).values({
          display_name: `${webhook.data.first_name} ${webhook.data.last_name}`,
          img_url: webhook.data.image_url,
          username: webhook.data.username,
        })
      }
  
      if(webhook.type === "user.deleted") {
        const dbuser = await db.query.users.findFirst({
          where: eq(users.username, webhook.data.username)
        })
        if(dbuser) {
          await Promise.all([
            db.delete(users).where(eq(users.id, dbuser.id)),
            db.delete(blocks).where(eq(blocks.user_id, dbuser.id))
          ])
        }
      }
      
      return {
        statusCode: 200
      }
    } catch(err) {
      console.error(err)
      return {
        statusCode: 500
      }
    }
  }

};

export { handler };