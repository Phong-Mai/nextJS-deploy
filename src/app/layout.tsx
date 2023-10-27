
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SessionProvider } from 'next-auth/react'
import ProviderWrapper from './ProviderWrapper'
import Provider from '@/component/Provider'
import { ReduxProvider } from '@/redux/provider'
import Header from '@/component/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
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
      <ReduxProvider>
        <Provider>
          {children}
        </Provider>
      </ReduxProvider> 

    </body>
    </html>

  )
}
