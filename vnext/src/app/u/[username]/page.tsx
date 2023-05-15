import { users, blocks } from '@/lib/db/schema'
import { connect } from '@planetscale/database'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import Image from 'next/image'
import { FaTwitter } from 'react-icons/fa'

enum BlockType {
  Custom = 0,
  Twitter = 1,
}

type Block = {
  id: number
  url: string | null,
  block_type: number | null
  user_id: number | null
}

type Data = {
  id: number
  username: string | null
  tagline: string | null
  display_name: string | null,
  blocks: Block[] | null
}

async function getData(username: string): Promise<Data | null> {
  const config = {
    url: process.env.DATABASE_URL
  }
  
  const conn = connect(config)
  const db = drizzle(conn)

  const user_rows = await db.select().from(users).where(eq(users.username, username)).limit(1)
  if(user_rows.length == 0) {
    return null
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

type Props = {
  params: {
    username: string
  }
}

export default async function UserPage({ params }: Props) {
  const data = await getData(params.username)

  if(!data) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        Cannot find that user :(
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          { data.display_name }&nbsp;
          <code className="font-mono font-bold">{ params.username }</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {data.blocks && data.blocks.map((block: Block) => (
          <a
            href={`https://twitter.com/${block.url}`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
            key={`block-${block.id}`}
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              <span className="flex gap-1">
                <FaTwitter /> @{block.url}{' '}
              </span>
              {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span> */}
            </h2>
            {/* {block.description && (
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Find in-depth information about Next.js features and API.
              </p>
            )} */}
          </a>
        ))}
      </div>
    </main>
  )
}
