'use client'
import React, { useEffect, useState } from 'react'
import {
    DeviceSettings,
    useCall,
    VideoPreview,
} from '@stream-io/video-react-sdk'
import { Button } from '../ui/button'

const MeetingSetup = ({
    setIsSetupComplete,
}: {
    setIsSetupComplete: (isSetupComplete: boolean) => void
}) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
    const call = useCall()

    if (!call) throw new Error('Call not found')

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [call?.camera, call?.microphone, isMicCamToggledOn, call])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-2 overflow-x-hidden">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="h-16 items-center justify-center gap-2">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isMicCamToggledOn}
                        onChange={(e) => {
                            setIsMicCamToggledOn(e.target.checked)
                        }}
                    />
                    Join with mic and camera off
                    <DeviceSettings />
                </label>
                <Button
                    onClick={() => {
                        call.join()
                        setIsSetupComplete(true)
                    }}
                    className="my-4 w-full rounded-md bg-green-500 px-4 py-2.5 text-white hover:bg-green-600"
                >
                    Join meeting
                </Button>
            </div>
        </div>
    )
}

export default MeetingSetup
