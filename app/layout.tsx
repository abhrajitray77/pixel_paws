import { account, getSession } from '@/utils/appwrite'
import './globals.css'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/utils/SidebarContext'
import { SessionContext, SessionProvider } from '@/utils/SessionContext'
import { useContext } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PixelPaws',
  description: 'Your favorite games, all in one place.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <SidebarProvider>
          {/* if there is no session */}
          {session?.status ? (
            <Login />
          ) : (
            <div className="h-screen flex flex-col">
              <Navbar />
              <div className=" flex overflow-hidden">
                <div className="md:border-r-[2px] md:my-4 md:border-r-red-600 w-auto">
                  {/* Sidebar */}
                  <Sidebar />
                </div>

                <div className="flex-1 p-6 py-0 my-10 w-auto overflow-y-scroll scrollbar-track-transparent
                scrollbar-thumb-gray-600 scrollbar-thin">
                  <div className="max-h-full">{children}</div>
                </div>
              </div>
            </div>
          )}
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  )
  
}