import { account } from '@/utils/appwrite'
import './globals.css'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SessionProvider from '@/components/SessionProvider'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

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
          {/* if there is no session */}
          {!session ? (
            <Login />
          ): (
        <div className="">
          <Navbar />
          <div className='border-r-[6px] rounded-full border-r-red-600 lg:max-w-[14rem] 
          h-screen overflow-y-auto
          md:max-w-[8rem]'>
            {/* Sidebar */}
            <Sidebar />
          </div>

        <div className="">{children}</div>
        </div>
          )}
        </SessionProvider>
        </body>
    </html>
  )
}
