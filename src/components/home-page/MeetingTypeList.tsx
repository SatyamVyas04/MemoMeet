'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import {
    CalendarDaysIcon,
    VideoCameraIcon,
    PlusIcon,
    RocketLaunchIcon,
} from '@heroicons/react/24/outline'

import { Button } from '@/components/ui/button'
import HomeCard from './HomeCard'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const MeetingTypeList = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [activeDialog, setActiveDialog] = useState<string | null>(null)
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const client = useStreamVideoClient()
    const { user } = useUser()
    const router = useRouter()

    const closeDialog = () => {
        setIsDialogOpen(false)
        setActiveDialog(null)
    }

    const handleCreateNewMeeting = async () => {
        if (!client || !user) {
            toast.error('No client or user found', {
                description: 'Please try again',
            })
            return
        }
        try {
            const id = crypto.randomUUID()
            const call = client.call('default', id)
            if (!call) {
                throw new Error('Error creating call')
            }
            const startsAt =
                values.dateTime.toISOString() ||
                new Date(Date.now()).toISOString()
            const description = values.description || 'Instant meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            })

            setCallDetails(call)

            toast.success('Meeting created successfully', {
                description: 'You can now share the link with others',
            })

            if (!values.description) {
                router.push(`/meeting/${id}`)
            }
            closeDialog()
        } catch (error) {
            toast.error('Error creating meeting', {
                description: 'Please try again',
            })
        }
    }

    const handleJoinMeeting = () => {
        toast.success('Joining meeting...')
        closeDialog()
    }

    const handleViewRecordings = () => {
        toast.success('Viewing all recordings...')
        closeDialog()
    }

    const handleScheduleMeeting = () => {
        toast.success('Scheduling meeting...')
        closeDialog()
    }

    const dialogs: { [key: string]: { title: string; content: JSX.Element } } =
        {
            createNewMeeting: {
                title: 'Create New Meeting',
                content: (
                    <>
                        <div className="flex w-full flex-row items-center gap-2">
                            <Button
                                variant="default"
                                className="w-full font-bold text-white"
                                onClick={handleCreateNewMeeting}
                            >
                                Create Meeting
                            </Button>
                            <Button
                                className="text-semibold"
                                variant="secondary"
                                onClick={closeDialog}
                            >
                                Close
                            </Button>
                        </div>
                    </>
                ),
            },
            joinMeeting: {
                title: 'Join a Meeting',
                content: (
                    <>
                        <input
                            type="text"
                            placeholder="Enter Meeting Code"
                            className="mb-4 w-full rounded border p-2"
                        />
                        <div className="flex flex-row items-center gap-2">
                            <Button
                                variant="default"
                                className="font-bold text-white"
                                onClick={handleJoinMeeting}
                            >
                                Join Meeting
                            </Button>
                            <Button
                                className="text-semibold"
                                variant="secondary"
                                onClick={closeDialog}
                            >
                                Close
                            </Button>
                        </div>
                    </>
                ),
            },
            viewRecordings: {
                title: 'View Recordings',
                content: (
                    <>
                        <ul className="mb-4">
                            <li className="mb-2">
                                Recording 1 - Date: 2024-08-27
                            </li>
                            <li className="mb-2">
                                Recording 2 - Date: 2024-08-26
                            </li>
                            <li className="mb-2">
                                Recording 3 - Date: 2024-08-25
                            </li>
                        </ul>
                        <div className="flex flex-row items-center gap-2">
                            <Button
                                variant="default"
                                className="font-bold text-white"
                                onClick={handleViewRecordings}
                            >
                                View All Recordings
                            </Button>
                            <Button
                                className="text-semibold"
                                variant="secondary"
                                onClick={closeDialog}
                            >
                                Close
                            </Button>
                        </div>
                    </>
                ),
            },
            scheduleMeeting: {
                title: 'Schedule Meeting',
                content: (
                    <>
                        <input
                            type="text"
                            placeholder="Meeting Name"
                            className="mb-4 w-full rounded border p-2"
                        />
                        <input
                            type="datetime-local"
                            className="mb-4 w-full rounded border p-2"
                        />
                        <div className="flex flex-row items-center gap-2">
                            <Button
                                variant="default"
                                className="font-bold text-white"
                                onClick={handleScheduleMeeting}
                            >
                                Schedule Meeting
                            </Button>
                            <Button
                                className="text-semibold"
                                variant="secondary"
                                onClick={closeDialog}
                            >
                                Close
                            </Button>
                        </div>
                    </>
                ),
            },
        }

    const openDialog = (dialogKey: React.SetStateAction<string | null>) => {
        setActiveDialog(dialogKey)
        setIsDialogOpen(true)
    }

    const homeCards = [
        {
            label: 'Create New Meeting',
            bgColor: '#fb923c',
            Icon: PlusIcon,
            description: 'Create a new meeting now',
            onClick: () => openDialog('createNewMeeting'),
        },
        {
            label: 'Join Meeting',
            bgColor: '#a78bfa',
            Icon: RocketLaunchIcon,
            description: 'Join a meeting via invite code',
            onClick: () => openDialog('joinMeeting'),
        },
        {
            label: 'View Recordings',
            bgColor: '#34d399',
            Icon: VideoCameraIcon,
            description: 'Browse any recordings you have',
            onClick: () => openDialog('viewRecordings'),
        },
        {
            label: 'Schedule a Meeting',
            bgColor: '#60a5fa',
            Icon: CalendarDaysIcon,
            description: 'Set a meeting for later',
            onClick: () => openDialog('scheduleMeeting'),
        },
    ]

    return (
        <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homeCards.map((card, index) => (
                <HomeCard key={index} {...card} />
            ))}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {activeDialog && dialogs[activeDialog].title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 py-2 text-foreground">
                        {activeDialog && dialogs[activeDialog].content}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default MeetingTypeList
