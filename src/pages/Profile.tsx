import { useEffect } from "react"

function Profile() {
  useEffect(() => {
    async function load() {
      const res = await fetch("/.netlify/functions/me")
      const json = await res.json()
      console.log(json)
    }
    load()
  }, [])

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile