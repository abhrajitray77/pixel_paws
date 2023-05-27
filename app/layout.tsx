import { account } from '@/utils/appwrite'
import './globals.css'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GameNeko',
  description: 'Your favorite games, all in one place.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        {!session ? (
          <Login />
        ): (
          <div>
              {children}
          </div>
        )}
        </SessionProvider>
        </body>
    </html>
  )
}
