import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Zoom Clone',
    description: 'A deeper dive into the realm of nextjs',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body
                    className={`${inter.className} bg-background text-foreground`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </ClerkProvider>
        </html>
    )
}
