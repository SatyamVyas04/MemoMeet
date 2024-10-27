'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    PlusIcon,
    RocketLaunchIcon,
    VideoCameraIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline'

import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import { Loader } from '@/components/ui/loader'
import { Textarea } from '@/components/ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

const initialValues = {
    dateTime: new Date(),
    description: '',
    link: '',
}

const MeetingTypeList = () => {
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<
        | 'isScheduleMeeting'
        | 'isJoiningMeeting'
        | 'isInstantMeeting'
        | undefined
    >(undefined)
    const [values, setValues] = useState(initialValues)
    const [callDetail, setCallDetail] = useState<Call>()
    const client = useStreamVideoClient()
    const { user } = useUser()

    const createMeeting = async () => {
        if (!client || !user) return
        try {
            if (!values.dateTime) {
                toast.error('Please select a date and time')
                return
            }
            const id = crypto.randomUUID()
            const call = client.call('default', id)
            if (!call) throw new Error('Failed to create meeting')
            const startsAt =
                values.dateTime.toISOString() ||
                new Date(Date.now()).toISOString()
            const description = values.description || 'Instant Meeting'
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            })
            setCallDetail(call)
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast.success('Meeting Created')
        } catch (error) {
            console.error(error)
            toast.error('Failed to create Meeting')
        }
    }

    if (!client || !user) return <Loader />

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`

    const homeCards = [
        {
            label: 'New Meeting',
            description: 'Start an instant meeting',
            bgColor: '#FB923C',
            Icon: PlusIcon,
            onClick: () => setMeetingState('isInstantMeeting'),
        },
        {
            label: 'Join Meeting',
            description: 'via invitation link',
            bgColor: '#A78BFA',
            Icon: RocketLaunchIcon,
            onClick: () => setMeetingState('isJoiningMeeting'),
        },
        {
            label: 'Schedule Meeting',
            description: 'Plan your meeting',
            bgColor: '#60A5FA',
            Icon: CalendarDaysIcon,
            onClick: () => setMeetingState('isScheduleMeeting'),
        },
        {
            label: 'View Recordings',
            description: 'Meeting Recordings',
            bgColor: '#34D399',
            Icon: VideoCameraIcon,
            onClick: () => router.push('/recordings'),
        },
    ]

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeCards.map((card, index) => (
                <HomeCard key={index} {...card} />
            ))}

            {!callDetail ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px]">
                            Add a description
                        </label>
                        <Textarea
                            className="bg-accent"
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px]">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) =>
                                setValues({ ...values, dateTime: date! })
                            }
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-accent p-2"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast.info('Link Copied')
                    }}
                    image={'/icons/checked.svg'}
                    buttonIcon="/icons/copy.svg"
                    className="text-center"
                    buttonText="Copy Meeting Link"
                />
            )}

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input
                    placeholder="Meeting link"
                    onChange={(e) =>
                        setValues({ ...values, link: e.target.value })
                    }
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </MeetingModal>

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList
