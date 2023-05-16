import { HandlerEvent, HandlerContext } from "@netlify/functions";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { blocks, users } from "./utils/db/schema";
import { eq } from "drizzle-orm";
import { createResponse } from "./utils/netlify_helpers";
import fetch from 'node-fetch'


const handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { username } = event.queryStringParameters as any
  const config = {
    url: process.env.DATABASE_URL,
    fetch
  }
  
  const conn = connect(config)
  const db = drizzle(conn)

  if(username) {
    const user_rows = await db.select().from(users).where(eq(users.username, username)).limit(1)
    if(user_rows.length == 0) {
      return {
        statusCode: 404
      }
    }
    const user = user_rows[0]
  
    const page_blocks = await db.select().from(blocks).where(eq(blocks.user_id, user.id))
    
    return createResponse(200, {
      id: user.id,
      username,
      display_name: user.display_name,
      tagline: user.tagline,
      blocks: page_blocks
    })
  } else {
    const user_rows = await db.select().from(users).limit(30)

    return createResponse(200, user_rows)
  }
};

export { handler };