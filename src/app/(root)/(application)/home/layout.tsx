import React, { ReactNode } from 'react'
import Navbar from '@/components/home-layout/Navbar'
import Sidebar from '@/components/home-layout/Sidebar'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="relative">
                <Navbar />
                <div className="flex">
                    <Sidebar />
                    <section className="sm:pt-18 flex min-h-screen flex-1 flex-col px-8 py-8 pt-24">
                        <div className="w-full">{children}</div>
                    </section>
                </div>
        </main>
    )
}

export default HomeLayout
