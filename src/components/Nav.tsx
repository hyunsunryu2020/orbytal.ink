import { UserButton } from '@clerk/clerk-react'

function Nav() {
  return (
    <div className='flex justify-end p-4 gap-2'>
      {/* {isSignedIn && 
        <button className="px-2 hover:bg-slate-300 hover:shadow-sm transition-all rounded-xl"
          onClick={() => navigate("/profile")}><FaPencilAlt /></button>
      } */}
      <UserButton />
    </div>
  )
}

export default Nav