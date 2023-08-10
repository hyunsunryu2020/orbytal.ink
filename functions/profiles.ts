import { HandlerEvent, HandlerContext } from "@netlify/functions";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { blocks, users } from "./utils/db/schema";
import { eq } from "drizzle-orm";
import { createResponse } from "./utils/netlify_helpers";
import fetch from 'node-fetch'
import { getDb } from "./utils/lib";


const handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { username } = event.queryStringParameters as any
  const db = getDb();

  if(username) {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
      with: {
        blocks: true,
      }
    })
    return createResponse(200, user)
  } else {
    const user_rows = await db.select().from(users).limit(30)

    return createResponse(200, user_rows)
  }
};

export { handler };