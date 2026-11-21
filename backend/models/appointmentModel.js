import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  // NEW FEATURE: Appointment notes (symptom pre-screening)
  symptoms: { type: String, default: '' },
  recommendedSpeciality: { type: String, default: '' },
  // NEW FEATURE: Waitlist
  isWaitlisted: { type: Boolean, default: false },
  waitlistPosition: { type: Number, default: 0 },
  // Reminder tracking
  reminderSent: { type: Boolean, default: false },
  cancelReason: { type: String, default: '' }
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)
export default appointmentModel
