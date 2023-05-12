import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { blocks } from '../../lib/db/schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const config = {
    url: process.env.DATABASE_URL
  }
  
  const conn = connect(config)

  const db = drizzle(conn)
  const allBlocks = await db.select().from(blocks);

  res.status(200).json(allBlocks);
}