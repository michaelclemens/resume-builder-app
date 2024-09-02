import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/ui/Header'
import { ThemeProvider } from '@/hooks/useTheme'
import BackgroundImage from '@/components/ui/BackgroundImage'
import 'react-quill/dist/quill.snow.css'
import React from 'react'
import ReduxProvider from '../redux-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resume Builder App',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`relative ${inter.className} bg-white text-black dark:bg-slate-950 dark:text-white`}>
        <ThemeProvider>
          <ReduxProvider>
            <div className="z-10 flex h-screen flex-col overflow-hidden">
              <Header />
              {children}
            </div>
          </ReduxProvider>
          <BackgroundImage />
        </ThemeProvider>
      </body>
    </html>
  )
}
