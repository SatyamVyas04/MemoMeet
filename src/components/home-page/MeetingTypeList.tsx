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

const MeetingTypeList = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')

    const handleCardClick = (title: string) => {
        setDialogTitle(title)
        setIsDialogOpen(true)
    }

    return (
        <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                label="Create New Meeting"
                bgColor="bg-orange-500"
                Icon={PlusIcon}
                description="Create a new meeting now"
                onClick={() => handleCardClick('Create New Meeting')}
            />
            <HomeCard
                label="Join Meeting"
                bgColor="bg-sky-500"
                Icon={RocketLaunchIcon}
                description="Join a meeting now"
                onClick={() => handleCardClick('Join Meeting')}
            />
            <HomeCard
                label="View Recordings"
                bgColor="bg-emerald-500"
                Icon={VideoCameraIcon}
                description="View upcoming meetings"
                onClick={() => handleCardClick('Meeting Types')}
            />
            <HomeCard
                label="Schedule Meeting"
                bgColor="bg-violet-500"
                Icon={CalendarDaysIcon}
                description="Schedule a meeting"
                onClick={() => handleCardClick('Schedule Meeting')}
            />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 flex justify-center">
                        <Button onClick={() => setIsDialogOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default MeetingTypeList
