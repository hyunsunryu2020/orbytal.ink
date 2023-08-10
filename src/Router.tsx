import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Layout from './Layout'
import { RedirectToSignIn, RedirectToSignUp, SignedIn, SignedOut } from '@clerk/clerk-react'

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={
            <>
              <SignedIn>
                <Profile />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/u/:username" element={<Profile />} />
          
          {/* Sign in/up */}
          <Route path="/sign-in" element={<RedirectToSignIn />} />
          <Route path="/sign-up" element={<RedirectToSignUp />} />

          {/* 404s */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router