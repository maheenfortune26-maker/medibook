import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default: true },
  fees: { type: Number, required: true },
  slots_booked: { type: Object, default: {} },
  address: { type: Object, required: true },
  date: { type: Number, required: true },
  // NEW FEATURE: Availability Calendar
  customSchedule: {
    type: Object,
    default: {
      monday: { active: true, startTime: '10:00', endTime: '18:00' },
      tuesday: { active: true, startTime: '10:00', endTime: '18:00' },
      wednesday: { active: true, startTime: '10:00', endTime: '18:00' },
      thursday: { active: true, startTime: '10:00', endTime: '18:00' },
      friday: { active: true, startTime: '10:00', endTime: '18:00' },
      saturday: { active: false, startTime: '10:00', endTime: '14:00' },
      sunday: { active: false, startTime: '10:00', endTime: '14:00' }
    }
  },
  languages: { type: [String], default: ['English'] },
  rating: { type: Number, default: 4.5 },
  totalReviews: { type: Number, default: 0 }
}, { minimize: false })

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)
export default doctorModel
