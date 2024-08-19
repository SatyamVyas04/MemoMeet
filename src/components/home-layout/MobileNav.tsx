'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { sidebarLinks } from '../../../constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = () => {
    const pathname = usePathname()
    return (
        <section className="sm:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="px-2">
                        <Image
                            src="/icons/hamburger.svg"
                            alt="menu"
                            width={24}
                            height={24}
                        ></Image>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="w-full max-w-[264px] border-none"
                >
                    <SheetHeader>
                        <SheetTitle className="-mt-1 mb-8">
                            <Link href="/" className="flex items-center gap-1">
                                <Image
                                    src="/icons/logo.svg"
                                    alt="Zoom logo"
                                    width={32}
                                    height={32}
                                ></Image>
                                <h1 className="text-[24px] font-extrabold">
                                    Zoom
                                </h1>
                            </Link>
                        </SheetTitle>
                        <SheetDescription>
                            {sidebarLinks.map((link) => {
                                const isActive = pathname === link.route

                                return (
                                    <Link
                                        href={link.route}
                                        key={link.label}
                                        className={cn(
                                            'flex items-center justify-start gap-4 rounded-md p-4',
                                            {
                                                'bg-primary text-accent':
                                                    isActive,
                                            }
                                        )}
                                    >
                                        <link.imgUrl className="h-6" />
                                        <p className="text-md font-bold">
                                            {link.label}
                                        </p>
                                    </Link>
                                )
                            })}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
