'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { avatarImages } from '@/constants'
import { toast } from 'sonner'

interface MeetingCardProps {
    title: string
    date: string
    icon: string
    isPreviousMeeting?: boolean
    buttonIcon1?: string
    buttonText?: string
    handleClick: () => void
    link: string
    summary?: string
    transcription?: string
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
    summary,
    transcription,
}: MeetingCardProps) => {
    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-accent/50 px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col gap-5">
                <Image src={icon} alt="upcoming" width={28} height={28} />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                    {summary && (
                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-semibold">Summary</h2>
                            <p className="text-sm">{summary}</p>
                        </div>
                    )}
                    {transcription && (
                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-semibold">
                                Transcription
                            </h2>
                            <p className="max-h-32 overflow-y-auto text-sm">
                                {transcription}
                            </p>
                        </div>
                    )}
                </div>
            </article>
            <article className={cn('relative flex justify-center', {})}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt="attendees"
                            width={40}
                            height={40}
                            className={cn('rounded-full', {
                                absolute: index > 0,
                            })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[7px] border-foreground bg-primary">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button
                            onClick={handleClick}
                            className="rounded bg-primary px-6"
                        >
                            {buttonIcon1 && (
                                <Image
                                    src={buttonIcon1}
                                    alt="feature"
                                    width={20}
                                    height={20}
                                />
                            )}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                navigator.clipboard.writeText(link)
                                toast.success('Link Copied')
                            }}
                            className="px-6"
                        >
                            <Image
                                src="/icons/copy.svg"
                                alt="feature"
                                width={20}
                                height={20}
                            />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    )
}

export default MeetingCard
