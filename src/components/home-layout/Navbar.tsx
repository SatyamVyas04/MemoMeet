'use client'
import React from 'react'
import { ModeToggle } from '../ui/mode-toggle'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from '@clerk/nextjs'
import { Button } from '../ui/button'

const Navbar = () => {
    const { isSignedIn } = useUser()
    const homeLink = isSignedIn ? '/home' : '/'

    return (
        <nav className="fixed z-50 flex w-full justify-between border-b-2 border-primary px-4 py-3 backdrop-blur-xl lg:px-6">
            <Link href={homeLink} className="flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    alt="MemoMeet logo"
                    width={32}
                    height={32}
                ></Image>
                <h1 className="text-[24px] font-extrabold">MemoMeet</h1>
            </Link>
            <div className="flex items-center justify-between gap-2 sm:gap-4">
                <SignedOut>
                    <Button>
                        <SignInButton />
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSwitchSessionUrl="/" />
                </SignedIn>
                <ModeToggle />
                <MobileNav />
            </div>
        </nav>
    )
}

export default Navbar
