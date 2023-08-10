import { useNavigate } from 'react-router-dom'
import { Profile } from '../models'

type Props = {
  profile: Profile
}

function ProfileSummaryCard({ profile }: Props) {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(`/u/${profile.username}`)} 
      className="text-left rounded-lg p-2 bg-slate-200 hover:bg-slate-300 hover:shadow transition-all flex gap-1 cursor-pointer">
      <div className="flex items-center">
        {profile.img_url && <img src={profile.img_url} className="max-w-[50px] max-h-[50px] rounded-full" />}
      </div>
      <div className="flex flex-col flex-1">
        <span className="font-bold">{ profile.display_name }</span>
        <span>{ profile.tagline }</span>
        <span className="italic text-sm text-slate-800">@{ profile.username }</span>
      </div>
    </button>
  )
}

export default ProfileSummaryCard