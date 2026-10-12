import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cursor AI - AI Code Editor dengan OpenAI Real',
  description: 'Professional AI-powered code editor. Real-time AI chat, code generation, debugging, dan refactoring dengan OpenAI integration. Works on web, mobile, dan desktop.',
  keywords: 'AI code editor, OpenAI, programming, coding assistant, IDE',
  authors: [{ name: 'Cursor Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  openGraph: {
    title: 'Cursor AI - AI Code Editor',
    description: 'AI-powered code editor dengan real OpenAI integration',
    type: 'website',
    url: 'https://cursor-ai.netlify.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursor AI',
    description: 'Professional AI code editor',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
