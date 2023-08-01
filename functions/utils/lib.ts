import { connect } from '@planetscale/database'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { blocks, users } from './db/schema'
import * as schema from './db/schema'
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

export async function getUserWithBlocksForUsername(username: string) {
  const config = {
    url: process.env.DATABASE_URL
  }
  
  const conn = connect(config)
  const db = drizzle(conn)

  const user_rows = await db.select().from(users).where(eq(users.username, username)).limit(1)
  if(user_rows.length == 0) {
    return {
      statusCode: 404
    }
  }
  const user = user_rows[0]

  const page_blocks = await db.select().from(blocks).where(eq(blocks.user_id, user.id))

  return {
    id: user.id,
    username,
    display_name: user.display_name,
    tagline: user.tagline,
    blocks: page_blocks
  }
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

export async function updateProfile(username: string, tagline: string) {
  const config = {
    url: process.env.DATABASE_URL
  }
  
  const conn = connect(config)
  const db = drizzle(conn)

  await db.update(users).set({ tagline }).where(eq(users.username, username))
}

export async function testRelations() {
  const config = {
    url: process.env.DATABASE_URL
  }
  
  const conn = connect(config)
  const db = drizzle(conn, { schema })

  return await db.query.blocks.findMany({
    with: {
      user: true
    }
  })
}