import React from 'react'
import { cn } from '@/lib/utils'

interface HomeCardProps {
    label: string
    bgColor: string
    Icon: React.ForwardRefExoticComponent<
        React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
    >
    description: string
    onClick: () => void
}

const HomeCard = ({
    label,
    bgColor,
    Icon,
    description,
    onClick,
}: HomeCardProps) => {
    return (
        <div
            className={cn(
                'flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-lg bg-opacity-90 p-4 shadow-md shadow-muted-foreground transition-all duration-300 ease-in-out hover:-translate-y-1 hover:rotate-1 hover:transform hover:bg-opacity-100 hover:shadow-xl',
                bgColor
            )}
            onClick={onClick}
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/25 p-2">
                <Icon className="h-8 w-8 text-foreground" />
            </div>
            <h3 className="mt-auto text-xl font-extrabold text-foreground">
                {label}
            </h3>
            <p className="text-semibold text-sm text-accent-foreground">
                {description}
            </p>
        </div>
    )
}

export default HomeCard
