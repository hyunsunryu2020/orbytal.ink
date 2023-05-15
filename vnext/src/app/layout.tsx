import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider, UserButton } from '@clerk/nextjs'

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
        <body className={inter.className}>
          <div className='flex justify-end p-4'>
            <UserButton />
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
