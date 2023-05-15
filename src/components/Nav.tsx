import { UserButton, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

function Nav() {
  const navigate = useNavigate()
  const { isSignedIn } = useUser();

  return (
    <div className='flex justify-end p-4 gap-2'>
      {isSignedIn && 
        <button className="px-2 hover:bg-slate-300 hover:shadow-sm transition-all rounded-xl"
          onClick={() => navigate("/profile")}><FaPencilAlt /></button>
      }
      <UserButton />
    </div>
  )
}

export default Nav