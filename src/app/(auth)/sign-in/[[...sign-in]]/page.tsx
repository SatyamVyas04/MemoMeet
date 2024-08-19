import { SignIn } from '@clerk/nextjs'
import { Link } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

const SignInPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
            <div className="my-4 flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    alt="Zoom logo"
                    width={32}
                    height={32}
                ></Image>
                <h1 className="text-[24px] font-extrabold max-sm:hidden">
                    Zoom
                </h1>
            </div>
            <SignIn />
        </div>
    )
}

export default SignInPage
