import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: '' },
  address: { type: Object, default: { line1: '', line2: '' } },
  gender: { type: String, default: 'Not Selected' },
  dob: { type: String, default: 'Not Selected' },
  phone: { type: String, default: '0000000000' },
  // NEW FEATURE: Notifications system
  notifications: [{
    id: { type: String },
    type: { type: String }, // 'reminder', 'confirmation', 'cancellation', 'waitlist'
    title: { type: String },
    message: { type: String },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }]
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel
