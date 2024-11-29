import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'InmoCRM',
    description: 'Real Estate CRM',
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang='en'>
            <body className='overflow-hidden'>
                <main
                    className={`${inter.className} flex min-h-screen w-full flex-col overflow-hidden`}
                >
                    {children}
                </main>
                <Toaster />
            </body>
        </html>
    )
}
