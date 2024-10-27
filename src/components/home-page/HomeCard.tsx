import React from 'react'

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
            className="group relative flex h-48 w-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
                background: `linear-gradient(145deg, ${bgColor}dd, ${bgColor})`,
            }}
            onClick={onClick}
        >
            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col justify-between">
                {/* Text Content */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{label}</h3>
                    <p className="text-sm text-white/90">{description}</p>
                </div>

                {/* Icon Container */}
                <div className="self-end">
                    <Icon className="h-8 w-8 text-white/90" />
                </div>
            </div>

            {/* Background Decoration */}
            <div
                className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 transform rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-6"
                style={{
                    background:
                        'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                }}
            />
            <div
                className="absolute bottom-0 right-0 h-24 w-24 translate-x-6 translate-y-6 transform rounded-full bg-white/5 transition-transform duration-300 group-hover:translate-x-4"
                style={{
                    background:
                        'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                }}
            />
        </div>
    )
}

export default HomeCard
