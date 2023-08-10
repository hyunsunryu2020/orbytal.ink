import { UserButton, useUser } from '@clerk/clerk-react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { useEditProfileStore, useEditModalStore, useProfileStore } from '../store';
import { useEffect } from 'react';

function Nav() {
  const navigate = useNavigate()
  const { isSignedIn, isLoaded, user } = useUser();
  const { setProfile } = useProfileStore((state) => state)
  const { showModal } = useEditModalStore((state) => state)

  useEffect(() => {
    if(!isLoaded) return
    if(!isSignedIn) return
    async function load() {
      const res = await fetch("/.netlify/functions/me")
      const json = await res.json()
      setProfile(json)
    }
    load()
  }, [isSignedIn, isLoaded, setProfile])

  function onEditClicked() {
    if(!user) return
    showModal()
  }

  return (
    <div className='flex justify-end p-4 gap-2'>
      { isLoaded && (
        <>
          {isSignedIn ?
            <button className="px-2 hover:bg-slate-300 hover:shadow-sm transition-all rounded-xl"
              onClick={() => onEditClicked()}><FaPencilAlt /></button>
            :
            <button className="py-2 px-3 hover:bg-slate-300 hover:text-slate-900 hover:shadow-sm transition-all rounded-xl"
              onClick={() => navigate("/sign-in")}>Sign in</button>
          }
        </>
      )}
      <UserButton />
    </div>
  )
}

export default Nav