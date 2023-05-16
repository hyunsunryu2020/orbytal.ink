import { connect } from '@planetscale/database'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { blocks, users } from './db/schema'
import fetch from 'node-fetch'

export async function getPageBlocksForUserId(id: number) {
  const config = {
    url: process.env.DATABASE_URL,
    fetch
  }
  
  const conn = connect(config)
  const db = drizzle(conn)
  const rows = db.select().from(blocks).where(eq(blocks.user_id, id))
  return rows
}

export async function getPageBlocksForUsername(username: string) {
  const config = {
    url: process.env.DATABASE_URL
  }
  
  const conn = connect(config)
  const db = drizzle(conn)

  // TODO: figure out how to just do a join here
  const user_rows = await db.select().from(users).where(eq(users.username, username)).limit(1)
  if(user_rows.length == 0) {
    return null
  }
  const user = user_rows[0]
  const rows = db.select().from(blocks).where(eq(blocks.user_id, user.id))
  return rows
}