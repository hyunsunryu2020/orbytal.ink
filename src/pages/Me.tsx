import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import Block from "../components/Block";

export interface Profile {
  id: number
  username: string
  display_name: string
  tagline: string
  img_url: string
  blocks: Block[]
}

export interface Block {
  id: number
  url: string
  block_type: number
  user_id: number
}

function Me() {
  const [profile, setProfile] = useState<Profile>()
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function load() {
      const res = await fetch(`/.netlify/functions/me`)
      const json = await res.json()
      setProfile(json)

      console.log(searchParams)
    }
    load()
  }, [])

  return (
    <div className="px-8 md:px-20 max-w-[1200px]">
      {profile && (
        <div>
          <div className="mb-8">
            <div className="mb-4">
              {profile.img_url && (
                <div className="flex justify-center md:justify-start">
                  <img src={profile.img_url} className="max-h-[125px] max-w-[125px] rounded-full shadow-sm mb-2 border-2 border-slate-300" />
                </div>
              )}
              <h1>{ profile.display_name }</h1>
              {/* TODO: copy profile url on click */}
              <span className="text-gray-700 italic">@{ profile.username }</span>
            </div>
            <div className="font-semibold text-lg">{ profile.tagline }</div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {profile.blocks.map(b => (
              <Block key={`block-${b.id}`} type={b.block_type} url={b.url} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Me