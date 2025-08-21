import './globals.css'
import React from 'react'
import { AuthProvider } from './providers'
import GlobalSidebar from './GlobalSidebar'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'NexaCare Provider Dashboard - Intelligent Healthcare Platform',
    template: '%s | NexaCare Provider'
  },
  description: 'AI-powered healthcare provider portal with intelligent patient management, clinical decision support, and 24/7 AI assistance.',
  keywords: ['healthcare', 'provider', 'AI', 'medical', 'clinical', 'patient management'],
  authors: [{ name: 'NexaCare Team' }],
  creator: 'NexaCare',
  publisher: 'NexaCare',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white`}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-light">
            <GlobalSidebar />
            <div className="lg:pl-20">
              <main className="min-h-screen bg-white">
                {children}
              </main>
            </div>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
} 