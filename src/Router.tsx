import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Layout from './Layout'
import { RedirectToSignIn, RedirectToSignUp, SignedIn, SignedOut } from '@clerk/clerk-react'
import Me from './pages/Me'
import New from './pages/New'

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={
            <>
              <SignedIn>
                <Me />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/u/:username" element={<Profile />} />
          <Route path="/new" element={<New />} />
          
          {/* Sign in/up */}
          <Route path="/sign-in" element={<RedirectToSignIn redirectUrl="/" />} />
          <Route path="/sign-up" element={<RedirectToSignUp redirectUrl="/new" />} />

          {/* 404s */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router