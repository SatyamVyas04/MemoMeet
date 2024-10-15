import { ThemeProvider } from '@/components/theme-provider'
import { Encode_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import './globals.css'
import '@stream-io/video-react-sdk/dist/css/styles.css'

const encodeSans = Encode_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'MemoMeet | Smart Video Conferencing',
    description:
        'Experience next-level video conferencing with AI-powered transcription and summarization. MemoMeet - Where conversations become insights.',
    keywords: [
        'video conferencing',
        'meeting transcription',
        'AI summarization',
        'remote collaboration',
        'productivity tools',
    ],
    authors: [{ name: 'Satyam Vyas', url: 'https://yourwebsite.com' }],
    creator: 'Satyam Vyas',
    publisher: 'Satyam Vyas',
    robots: 'index, follow',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://memomeet.com',
        siteName: 'MemoMeet',
        title: 'MemoMeet - Smart Video Conferencing Platform',
        description:
            'Transform your meetings with AI-powered transcription and summarization. MemoMeet makes every conversation count.',
        images: [
            {
                url: 'https://memomeet.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'MemoMeet - Smart Video Conferencing',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@memomeet',
        creator: '@SatyamVyas04',
    },
    applicationName: 'MemoMeet',
    referrer: 'origin-when-cross-origin',
    category: 'Technology',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <ClerkProvider>
                <body
                    className={`${encodeSans.className} bg-background text-foreground`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
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
