// models/users.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

interface IUser extends Document {
    user_id: string
    meeting_id: string
    audio: Buffer
    transcription?: string
    summary?: string
    createdAt?: Date
}

const userSchema = new Schema<IUser>({
    user_id: { type: String, required: true },
    meeting_id: { type: String, required: true },
    audio: { type: Buffer, required: true },
    transcription: { type: String },
    summary: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const User: Model<IUser> =
    mongoose.model<IUser>('User', userSchema)

export default User
export type { IUser }
