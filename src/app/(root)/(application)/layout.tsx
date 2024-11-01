import React, { ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="relative">
            <StreamVideoProvider>{children}</StreamVideoProvider>
        </main>
    )
}

export default HomeLayout
