// actions/flask.actions.ts
import axios from 'axios'
import dbConnect from '@/lib/mongo'
import User, { IUser } from '@/models/users'
import FormData from 'form-data'

interface ProcessAudioInput {
    user_id: string
    meeting_id: string
    videoUrl: string
}

export async function processAudio({
    user_id,
    meeting_id,
    videoUrl,
}: ProcessAudioInput) {
    await dbConnect()

    // Check if audio already exists in MongoDB
    let userRecord = await User.findOne({ user_id, meeting_id })
    if (!userRecord) {
        // Extract audio from video
        const audioBuffer = await extractAudioFromVideo(videoUrl)

        // Save audio to MongoDB
        userRecord = await User.create({
            user_id,
            meeting_id,
            audio: audioBuffer,
        })
    }

    // Send the audio to Flask server for transcription and summarization
    const flaskResponse = await sendAudioToFlask(userRecord.audio)
    const { transcription, summary } = flaskResponse.data

    // Update MongoDB record with transcription and summary
    userRecord.transcription = transcription
    userRecord.summary = summary
    await userRecord.save()

    return { transcription, summary }
}

// Helper function to extract audio from video URL
async function extractAudioFromVideo(videoUrl: string): Promise<Buffer> {
    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' })
    return Buffer.from(response.data)
}

// Helper function to send audio to Flask server
async function sendAudioToFlask(audioBuffer: Buffer) {
    const formData = new FormData()
    formData.append('audio', audioBuffer, {
        filename: 'audio.wav',
        contentType: 'audio/wav',
    })

    return axios.post(`${process.env.FLASK_SERVER_URL}/transcribe`, formData, {
        headers: formData.getHeaders(),
    })
}
