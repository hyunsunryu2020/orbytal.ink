import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      await fetch("/.netlify/functions/profiles")
    }
    load()
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div className="h-[80vh] flex flex-col gap-2 justify-center items-center w-screen">
        <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">Out of this world</div>
        <div className="text-6xl font-bold mb-4 shadow-sm">bio-link service</div>
        <button className="rounded-xl p-3 font-bold bg-slate-800 text-slate-50 hover:shadow-lg hover:bg-slate-700"
          onClick={() => navigate("/profile")}>Create your profile!</button>
      </div>
      <div className="grid">
        <div>new user cards here</div>
      </div>
    </div>
  )
}

export default Home