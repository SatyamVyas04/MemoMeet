import { cn } from '@/lib/utils'
import {
    CallControls,
    CallParticipantsList,
    PaginatedGridLayout,
    SpeakerLayout,
} from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
type CallLayout = 'speaker-left' | 'speaker-right' | 'grid'

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayout>('speaker-left')
    const [showParticipantsBar, setShowParticipantsBar] = useState(false)

    const CallLayout = () => {
        switch (layout) {
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition="right" />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />
            case 'grid':
                return <PaginatedGridLayout />
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-foreground">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn('ml-2 hidden h-[calc(100vh-90px)]', {
                        'show-block': showParticipantsBar,
                    })}
                >
                    <CallParticipantsList
                        onClose={() => setShowParticipantsBar(false)}
                    />
                </div>
            </div>
            <div className="fixed bottom-0 flex w-full items-center justify-center gap-4">
                <CallControls />
            </div>
        </section>
    )
}

export default MeetingRoom
