import { ReactNode } from 'react'
import Nav from './components/Nav'
import EditProfileModal from './components/EditProfileModal'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div>
      <Nav />
      { children }
      <EditProfileModal />
    </div>
  )
}

export default Layout