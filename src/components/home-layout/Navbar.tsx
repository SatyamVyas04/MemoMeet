import React from 'react'
import { ModeToggle } from '../ui/mode-toggle'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

const Navbar = () => {
    return (
        <nav className="fixed z-50 flex w-full justify-between border-b-2 border-primary px-6 py-4 backdrop-blur-xl lg:px-10">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    alt="Zoom logo"
                    width={32}
                    height={32}
                ></Image>
                <h1 className="text-[24px] font-extrabold max-sm:hidden">
                    Zoom
                </h1>
            </Link>
            <div className="flex items-center justify-between gap-2 sm:gap-4">
                <SignedOut>
                    <Button>
                        <SignInButton />
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <ModeToggle />
                <MobileNav />
            </div>
        </nav>
    )
}

export default Navbar
