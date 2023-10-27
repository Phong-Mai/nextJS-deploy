
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/component/header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header/>
          {children}
          <ToastContainer/>
    </body>
    </html>

  )
}