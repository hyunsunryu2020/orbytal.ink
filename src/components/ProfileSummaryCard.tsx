import { useNavigate } from 'react-router-dom'
import { Profile } from '../models'

type Props = {
  profile: Profile
}

function ProfileSummaryCard({ profile }: Props) {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(`/u/${profile.username}`)} className="text-left rounded-lg p-2 bg-slate-200 hover:bg-slate-300 hover:shadow transition-all grid gap-1 cursor-pointer">
      <span className="font-bold">{ profile.display_name }</span>
      <span>{ profile.tagline }</span>
      <span className="italic text-sm text-slate-800">@{ profile.username }</span>
    </button>
  )
}

export default ProfileSummaryCard