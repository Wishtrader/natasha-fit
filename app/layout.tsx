import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Oswald } from 'next/font/google'
import './globals.css'

const bodyFont = DM_Sans({ subsets: ['latin', 'cyrillic'], variable: '--font-body' })
const displayFont = Oswald({ subsets: ['latin', 'cyrillic'], variable: '--font-display' })

export const metadata: Metadata = {
  title: 'NatashaFIT — бесплатный 5-дневный online-интенсив',
  description: 'За 5 дней уменьшите отёчность, почувствуйте мышцы и добавьте телу тонуса вместе с Натальей Короткой.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f0e9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
