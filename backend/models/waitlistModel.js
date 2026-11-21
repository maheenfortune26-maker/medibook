import mongoose from 'mongoose'

// NEW FEATURE: Waitlist system - 4th collection
const waitlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
  position: { type: Number, required: true },
  notified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
})

const waitlistModel = mongoose.models.waitlist || mongoose.model('waitlist', waitlistSchema)
export default waitlistModel
