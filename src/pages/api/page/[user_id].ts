import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { eq } from 'drizzle-orm';
import { blocks, users } from '../../../lib/db/schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query

  const userIdNum = +(user_id as string)

  const config = {
    url: process.env.DATABASE_URL
  }
  
  const conn = connect(config)
  const db = drizzle(conn)

  const [user, page_blocks] = await Promise.all([
    await db.select().from(users).where(eq(blocks.id, userIdNum)),
    await db.select().from(blocks).where(eq(blocks.user_id, userIdNum))
  ])

  // const allBlocks = await db.select().from(blocks);

  res.status(200).json({
    user,
    page_blocks
  });
}