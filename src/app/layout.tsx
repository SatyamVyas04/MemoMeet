import { ThemeProvider } from '@/components/theme-provider'
import { Encode_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

const encodeSans = Encode_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})

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
                    className={`${encodeSans.className} bg-background text-foreground`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster
                            richColors
                            closeButton
                            expand={false}
                            position="bottom-center"
                        />
                    </ThemeProvider>
                </body>
            </ClerkProvider>
        </html>
    )
}
