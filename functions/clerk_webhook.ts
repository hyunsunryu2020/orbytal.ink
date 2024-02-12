// functions/clerk_webhook.ts
import { HandlerEvent, HandlerContext } from '@netlify/functions'
import { getDb } from './utils/lib'
import { users } from './utils/db/schema'
import { eq } from 'drizzle-orm'
// This type describes the structure of the incoming webhook
type ClerkWebhook = {
  data: {
      email:string
      password_hash:string
  }
  type: string
}
const handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.body) {
    // 👉 Parse the incomign event body into a ClerkWebhook object
    const webhook = JSON.parse(event.body) as ClerkWebhook
    try {
      const db = getDb()
      // 👉 `webhook.type` is a string value that describes what kind of event we need to handle

      // 👉 If the type is "user.updated" the important values in the database will be updated in the users table
      // if (webhook.type === 'user.updated') {
      //   await db
      //     .update(users)
      //     .set({
      //       display_name: `${webhook.data.first_name} ${webhook.data.last_name}`,
      //       img_url: webhook.data.image_url
      //     })
      //     .where(eq(users.email, webhook.data.email))
      // }

      // 👉 If the type is "user.created" create a record in the users table
      if (webhook.type === 'user.created') {
        await db.insert(users).values({
          email: webhook.data.email,
          password_hash: webhook.data.password_hash,
          created_at: new Date(), // Assuming you want to set the current timestamp
      
        })
      }

      // 👉 If the type is "user.deleted", delete the user record and associated blocks
      if (webhook.type === 'user.deleted') {
        const dbuser = await db.query.users.findFirst({
          where: eq(users.username, webhook.data.username)
        })
        console.log('dbuser', dbuser)
        if (dbuser) {
          await Promise.all([
            db.delete(users).where(eq(users.user_id, dbuser.user_id)),
            db.delete(blocks).where(eq(blocks.user_id, dbuser.user_id))
          ])
        }
      }

      return {
        statusCode: 200
      }
    } catch (err) {
      console.error(err)
      return {
        statusCode: 500
      }
    }
  }
}
export { handler }
