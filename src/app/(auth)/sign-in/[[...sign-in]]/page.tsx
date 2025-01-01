import { SignIn } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'

const SignInPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
            <div className="my-4 flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    alt="MemoMeet logo"
                    width={32}
                    height={32}
                 />
                <h1 className="text-[24px] font-extrabold max-sm:hidden">
                    MemoMeet
                </h1>
            </div>
            <SignIn />
        </div>
    )
}

export default SignInPage
