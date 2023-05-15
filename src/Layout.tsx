import { ReactNode } from 'react'
import Nav from './components/Nav'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div>
      <Nav />
      { children }
    </div>
  )
}

export default Layout