import { cn } from '@/lib/utils'
import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    PaginatedGridLayout,
    SpeakerLayout,
    ToggleAudioPublishingButton,
    ToggleVideoPublishingButton,
    ScreenShareButton,
    RecordCallButton,
    ReactionsButton,
    CancelCallButton,
    useCallStateHooks,
    CallingState,
} from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
} from '../ui/dropdown-menu'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'
import { LayoutList, Router, Users } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import { Loader } from '../ui/loader'

type CallLayout = 'speaker-left' | 'speaker-right' | 'grid'

const MeetingRoom = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isPersonalRoom = Boolean(searchParams.get('personal'))
    const [layout, setLayout] = useState<CallLayout>('speaker-left')
    const [showParticipantsBar, setShowParticipantsBar] = useState(false)
    const { useCallCallingState } = useCallStateHooks()
    const callingState = useCallCallingState()

    if (callingState != CallingState.JOINED) return <Loader />

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
        <section className="relative h-screen w-full overflow-hidden text-foreground">
            <div className="relative flex-grow overflow-hidden">
                <div className="h-full w-full p-2 md:p-4">
                    <CallLayout />
                </div>
                <div
                    className={cn(
                        'absolute right-0 top-0 h-full w-80 bg-background transition-transform duration-300 ease-in-out',
                        showParticipantsBar
                            ? 'translate-x-0'
                            : 'translate-x-full'
                    )}
                >
                    <div className="h-full overflow-y-auto p-4">
                        <CallParticipantsList
                            onClose={() => setShowParticipantsBar(false)}
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-t bg-[#020817] p-2 md:p-4">
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                    <div className="flex gap-2 md:gap-4">
                        <ToggleAudioPublishingButton />
                        <ToggleVideoPublishingButton />
                    </div>
                    <div className="flex gap-2 md:gap-4">
                        <ScreenShareButton />
                        <RecordCallButton />
                        <ReactionsButton />
                    </div>
                    <div className="flex gap-2 md:gap-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="cursor-pointer rounded-full bg-[#19232d] p-2 hover:bg-[#323b44]">
                                            <LayoutList
                                                size={20}
                                                className="text-white"
                                            />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>
                                                Layout Settings
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onSelect={() =>
                                                    setLayout('speaker-left')
                                                }
                                            >
                                                Speaker Left
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={() =>
                                                    setLayout('speaker-right')
                                                }
                                            >
                                                Speaker Right
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={() =>
                                                    setLayout('grid')
                                                }
                                            >
                                                Grid
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Change Layout</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() =>
                                            setShowParticipantsBar(
                                                (prev) => !prev
                                            )
                                        }
                                        variant="ghost"
                                        size="icon"
                                        className="cursor-pointer rounded-full bg-[#19232d] p-2 hover:bg-[#323b44]"
                                    >
                                        <Users
                                            size={20}
                                            className="text-white"
                                        />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-white">
                                        Toggle Participants List
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CallStatsButton />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-white">Call Stats</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="mt-2 md:mt-0">
                        <CancelCallButton
                            onLeave={() => {
                                router.push('/home')
                            }}
                        />
                    </div>
                    {!isPersonalRoom && (
                        <div className="mt-2 md:mt-0">
                            <EndCallButton />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default MeetingRoom
