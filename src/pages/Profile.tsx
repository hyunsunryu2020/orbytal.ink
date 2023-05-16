import { useEffect, useState } from "react"
import { FaTwitter } from "react-icons/fa";
import { useParams } from "react-router-dom";

export interface Profile {
  id: number
  username: string
  display_name: string
  tagline: string
  blocks: Block[]
}

export interface Block {
  id: number
  url: string
  block_type: number
  user_id: number
}


function Profile() {
  const [profile, setProfile] = useState<Profile>()
  const { username } = useParams();

  useEffect(() => {
    if(!username) return
    async function load() {
      const res = await fetch(`/.netlify/functions/profiles?username=${username}`)
      const json = await res.json()
      console.log(json)
      setProfile(json)
    }
    load()
  }, [username])

  return (
    <div className="px-20">
      {profile && (
        <div>
          <div>
            <div>{ profile.display_name }</div>
            <div>{ profile.tagline } </div>
            <div>@{profile.username}</div>
          </div>
          <div>
            {profile.blocks.map(b => (
              <button onClick={() => window.open(`https://twitter.com/${b.url}`, '_blank')} className="text-left p-4 bg-slate-200 hover:bg-[#1D9BF0] transition-all rounded-lg flex items-center gap-1">
                <FaTwitter /> @{b.url}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile