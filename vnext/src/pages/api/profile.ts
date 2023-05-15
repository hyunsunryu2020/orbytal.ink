import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { getPageBlocksForUsername } from '@/lib/lib';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
 
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
 
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  if(!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const page_blocks = await getPageBlocksForUsername(user.username as string)

  res.status(200).json({
    user,
    blocks: page_blocks
  });
}