'use client'

import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { Loader } from '@/components/ui/loader'
import { useGetCalls } from '@/hooks/useGetCalls'
import MeetingCard from './MeetingCard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { processAudio } from '@/actions/flask.actions'

interface EnhancedCallRecording extends CallRecording {
    transcription?: string
    summary?: string
}

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const router = useRouter()
    const { endedCalls, upcomingCalls, callRecordings, isLoading } =
        useGetCalls()
    const [recordings, setRecordings] = useState<EnhancedCallRecording[]>([])

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls
            case 'recordings':
                return recordings
            case 'upcoming':
                return upcomingCalls
            default:
                return []
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls'
            case 'upcoming':
                return 'No Upcoming Calls'
            case 'recordings':
                return 'No Recordings'
            default:
                return ''
        }
    }

    useEffect(() => {
        const fetchRecordingsAndProcess = async () => {
            if (!callRecordings) return

            const processedRecordings = await Promise.all(
                callRecordings.map(async (meeting) => {
                    // Get recording data
                    const recordingData = await meeting.queryRecordings()

                    if (recordingData.recordings.length === 0) return null

                    // Get members to extract user_id
                    const membersData = await meeting.queryMembers()
                    const user_id = membersData.members[0]?.user_id

                    // Process each recording
                    const enhancedRecordings = await Promise.all(
                        recordingData.recordings.map(async (recording) => {
                            try {
                                const { transcription, summary } =
                                    await processAudio({
                                        user_id,
                                        meeting_id: meeting.id,
                                        videoUrl: recording.url,
                                    })

                                return {
                                    ...recording,
                                    transcription,
                                    summary,
                                }
                            } catch (error) {
                                console.error(
                                    'Error processing recording:',
                                    error
                                )
                                return recording
                            }
                        })
                    )

                    return enhancedRecordings
                })
            )

            // Filter out null values and flatten the array
            const flattenedRecordings = processedRecordings
                .filter(Boolean)
                .flat() as EnhancedCallRecording[]

            setRecordings(flattenedRecordings)
        }

        if (type === 'recordings') {
            fetchRecordingsAndProcess()
        }
    }, [type, callRecordings])

    if (isLoading) return <Loader />

    const calls = getCalls()
    const noCallsMessage = getNoCallsMessage()

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | EnhancedCallRecording) => (
                    <MeetingCard
                        key={(meeting as Call).id}
                        icon={
                            type === 'ended'
                                ? '/icons/previous.svg'
                                : type === 'upcoming'
                                  ? '/icons/upcoming.svg'
                                  : '/icons/recordings.svg'
                        }
                        title={
                            (meeting as Call).state?.custom?.description ||
                            (meeting as CallRecording).filename?.substring(
                                0,
                                20
                            ) ||
                            'No Description'
                        }
                        date={
                            (
                                meeting as Call
                            ).state?.startsAt?.toLocaleString() ||
                            (
                                meeting as CallRecording
                            ).start_time?.toLocaleString()
                        }
                        isPreviousMeeting={type === 'ended'}
                        link={
                            type === 'recordings'
                                ? (meeting as CallRecording).url
                                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                        }
                        buttonIcon1={
                            type === 'recordings'
                                ? '/icons/play.svg'
                                : undefined
                        }
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick={
                            type === 'recordings'
                                ? () =>
                                      router.push(
                                          `${(meeting as CallRecording).url}`
                                      )
                                : () =>
                                      router.push(
                                          `/meeting/${(meeting as Call).id}`
                                      )
                        }
                        summary={(meeting as EnhancedCallRecording).summary}
                        transcription={
                            (meeting as EnhancedCallRecording).transcription
                        }
                    />
                ))
            ) : (
                <h1 className="text-2xl font-bold">{noCallsMessage}</h1>
            )}
        </div>
    )
}

export default CallList
