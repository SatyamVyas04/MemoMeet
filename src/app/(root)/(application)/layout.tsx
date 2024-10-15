import React, { ReactNode } from 'react'
import Navbar from '@/components/home-layout/Navbar'
import Sidebar from '@/components/home-layout/Sidebar'
import StreamVideoProvider from '@/providers/StreamClientProvider'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="relative">
            <StreamVideoProvider>
                <Navbar />
                <div className="flex">
                    <Sidebar />
                    <section className="sm:pt-18 flex min-h-screen flex-1 flex-col px-8 py-8 pt-20">
                        <div className="w-full">{children}</div>
                    </section>
                </div>
            </StreamVideoProvider>
        </main>
    )
}

export default HomeLayout
