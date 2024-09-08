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
    const noHexColor = bgColor.replace('#', '')
    const patternImage = `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${noHexColor}' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

    return (
        <div
            className={`flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-lg bg-opacity-90 p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:rotate-1 hover:transform hover:bg-opacity-100 bg-[${bgColor}]`}
            style={{
                backgroundImage: `radial-gradient(circle at top right, transparent 0%, transparent 10%, ${bgColor} 50%), ${patternImage}`,
                backgroundPosition: 'center center',
            }}
            onClick={onClick}
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/25 p-2">
                <Icon
                    className="h-8 w-8 text-foreground"
                    style={{ fill: bgColor }}
                />
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
