import './globals.css'
import React from 'react'
import { AuthProvider } from './providers'
import GlobalSidebar from './GlobalSidebar'

export const metadata = {
  title: 'Mediva Provider Dashboard',
  description: 'Comprehensive healthcare provider portal with AI integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AuthProvider>
          <GlobalSidebar />
          <div className="ml-16">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
} 