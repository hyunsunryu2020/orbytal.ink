import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Clerk } from '@clerk/nextjs/dist/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OrbytaLink',
  description: 'An out of this world bio-link service!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
