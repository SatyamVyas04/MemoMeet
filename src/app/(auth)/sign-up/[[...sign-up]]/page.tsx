import { SignUp } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'

const SignUpPage = () => {
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
            <SignUp />
        </div>
    )
}

export default SignUpPage
