import { account, getSessionData } from '@/utils/appwrite'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'


export const metadata = {
  title: 'PixelPaws',
  description: 'Your favorite games, all in one place.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
  
}