import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Profile } from '../models'
import ProfileSummaryCard from '../components/ProfileSummaryCard'

function Home() {
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    // TODO: Loading state
    async function load() {
      const res = await fetch("/.netlify/functions/profiles")
      if(res.status === 200) {
        const p = await res.json()
        setProfiles(p)
      }
    }
    load()
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div className="h-[80vh] flex flex-col gap-2 justify-center items-center w-screen">
        <div className="text-center text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">Out of this world</div>
        <div className="text-center text-6xl font-bold mb-4">bio-link service</div>
        <button className="rounded-xl p-3 font-bold bg-slate-800 text-slate-50 hover:shadow-lg hover:bg-slate-700"
          onClick={() => navigate("/profile")}>Create your profile!</button>
      </div>
      <div className="px-4 md:px-20 grid md:grid-cols-3">
        {profiles.length > 0 && profiles.map((p: Profile) => <ProfileSummaryCard key={`profile-${p.username}`} profile={p} />)}
      </div>
    </div>
  )
}

export default Home
