import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import waitlistModel from '../models/waitlistModel.js'

// Helper: upload buffer to cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    stream.end(buffer)
  })
}

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.json({ success: false, message: 'Missing details' })
    if (!validator.isEmail(email)) return res.json({ success: false, message: 'Invalid email' })
    if (password.length < 8) return res.json({ success: false, message: 'Password must be at least 8 characters' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = { name, email, password: hashedPassword }
    const newUser = new userModel(userData)
    const user = await newUser.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return res.json({ success: false, message: 'User does not exist' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Get user profile
const getProfile = async (req, res) => {
  try {
    const { userId } = req
    const userData = await userModel.findById(userId).select('-password')
    res.json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) return res.json({ success: false, message: 'Data missing' })

    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

    if (imageFile) {
      const imageUpload = await uploadToCloudinary(imageFile.buffer)
      await userModel.findByIdAndUpdate(userId, { image: imageUpload.secure_url })
    }

    res.json({ success: true, message: 'Profile updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId } = req
    const { docId, slotDate, slotTime, symptoms } = req.body

    const docData = await doctorModel.findById(docId).select('-password')
    if (!docData.available) return res.json({ success: false, message: 'Doctor not available' })

    let slots_booked = docData.slots_booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = [slotTime]
    }

    const userData = await userModel.findById(userId).select('-password')
    delete docData.slots_booked

    const appointmentData = {
      userId, docId, userData, docData,
      amount: docData.fees,
      slotTime, slotDate,
      date: Date.now(),
      symptoms: symptoms || ''
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    // Add confirmation notification
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        notifications: {
          id: newAppointment._id.toString(),
          type: 'confirmation',
          title: 'Appointment Confirmed',
          message: `Your appointment with ${docData.name} on ${slotDate} at ${slotTime} is confirmed.`,
          read: false,
          createdAt: new Date()
        }
      }
    })

    res.json({ success: true, message: 'Appointment booked' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)
    let slots_booked = doctorData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    // Check waitlist and notify first person
    const waitlistEntry = await waitlistModel.findOne({
      docId, slotDate, slotTime, notified: false
    }).sort({ position: 1 })

    if (waitlistEntry) {
      await waitlistModel.findByIdAndUpdate(waitlistEntry._id, { notified: true })
      await userModel.findByIdAndUpdate(waitlistEntry.userId, {
        $push: {
          notifications: {
            id: waitlistEntry._id.toString(),
            type: 'waitlist',
            title: 'Slot Available!',
            message: `A slot with ${waitlistEntry.docData.name} on ${slotDate} at ${slotTime} is now available. Book quickly!`,
            read: false,
            createdAt: new Date()
          }
        }
      })
    }

    // Add cancellation notification
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        notifications: {
          id: appointmentId,
          type: 'cancellation',
          title: 'Appointment Cancelled',
          message: `Your appointment with ${appointmentData.docData.name} on ${slotDate} at ${slotTime} has been cancelled.`,
          read: false,
          createdAt: new Date()
        }
      }
    })

    res.json({ success: true, message: 'Appointment cancelled' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Get user appointments
const listAppointment = async (req, res) => {
  try {
    const { userId } = req
    const appointments = await appointmentModel.find({ userId })
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Payment - create razorpay order
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: 'Appointment cancelled or not found' })
    }

    // Create Razorpay order (requires Razorpay SDK in production)
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY || 'USD',
      receipt: appointmentId
    }

    // Mock response for demo (replace with actual Razorpay in production)
    const order = {
      id: 'order_' + Date.now(),
      amount: options.amount,
      currency: options.currency
    }

    res.json({ success: true, order })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Verify payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, appointmentId } = req.body
    // In production: verify razorpay signature here
    await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
    res.json({ success: true, message: 'Payment successful' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ============================================
// NEW FEATURE 1: AI Symptom Checker
// ============================================
const symptomCheck = async (req, res) => {
  try {
    const { symptoms } = req.body
    if (!symptoms) return res.json({ success: false, message: 'No symptoms provided' })

    // Rule-based symptom to speciality mapping
    const symptomMap = [
      { keywords: ['chest pain', 'heart', 'palpitation', 'shortness of breath', 'breathing'], speciality: 'General physician', urgency: 'high' },
      { keywords: ['skin', 'rash', 'acne', 'eczema', 'itching', 'allergy'], speciality: 'Dermatologist', urgency: 'low' },
      { keywords: ['headache', 'migraine', 'seizure', 'numbness', 'dizziness', 'memory', 'nerve'], speciality: 'Neurologist', urgency: 'medium' },
      { keywords: ['stomach', 'abdomen', 'nausea', 'vomiting', 'diarrhea', 'digestion', 'constipation', 'bloating'], speciality: 'Gastroenterologist', urgency: 'medium' },
      { keywords: ['pregnancy', 'menstrual', 'period', 'ovary', 'uterus', 'gynaecology', 'women'], speciality: 'Gynecologist', urgency: 'medium' },
      { keywords: ['child', 'baby', 'infant', 'fever child', 'pediatric', 'toddler', 'kids'], speciality: 'Pediatricians', urgency: 'medium' },
    ]

    const lowerSymptoms = symptoms.toLowerCase()
    let matched = null
    let highestMatches = 0

    for (const item of symptomMap) {
      const matches = item.keywords.filter(k => lowerSymptoms.includes(k)).length
      if (matches > highestMatches) {
        highestMatches = matches
        matched = item
      }
    }

    if (!matched) {
      matched = { speciality: 'General physician', urgency: 'low' }
    }

    const urgencyMessages = {
      high: 'Your symptoms may require immediate attention. Please book an urgent appointment.',
      medium: 'Your symptoms should be evaluated soon. Book an appointment within a few days.',
      low: 'Your symptoms appear non-urgent. Book at your convenience.'
    }

    res.json({
      success: true,
      recommendation: {
        speciality: matched.speciality,
        urgency: matched.urgency,
        message: urgencyMessages[matched.urgency],
        symptomsAnalyzed: symptoms
      }
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ============================================
// NEW FEATURE 2: Notifications
// ============================================
const getNotifications = async (req, res) => {
  try {
    const { userId } = req
    const user = await userModel.findById(userId).select('notifications')
    res.json({ success: true, notifications: user.notifications || [] })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const markNotificationsRead = async (req, res) => {
  try {
    const { userId } = req
    await userModel.findByIdAndUpdate(userId, {
      $set: { 'notifications.$[].read': true }
    })
    res.json({ success: true, message: 'Notifications marked as read' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// ============================================
// NEW FEATURE 3: Waitlist
// ============================================
const joinWaitlist = async (req, res) => {
  try {
    const { userId } = req
    const { docId, slotDate, slotTime } = req.body

    const existing = await waitlistModel.findOne({ userId, docId, slotDate, slotTime })
    if (existing) {
      return res.json({ success: false, message: 'You are already on the waitlist for this slot' })
    }

    const position = await waitlistModel.countDocuments({ docId, slotDate, slotTime }) + 1
    const docData = await doctorModel.findById(docId).select('-password')
    const userData = await userModel.findById(userId).select('-password')

    const waitlistEntry = new waitlistModel({
      userId, docId, slotDate, slotTime,
      userData, docData,
      amount: docData.fees,
      position,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    await waitlistEntry.save()

    // Notify user they joined waitlist
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        notifications: {
          id: waitlistEntry._id.toString(),
          type: 'waitlist',
          title: 'Added to Waitlist',
          message: `You are #${position} on the waitlist for ${docData.name} on ${slotDate} at ${slotTime}. We'll notify you if a slot opens.`,
          read: false,
          createdAt: new Date()
        }
      }
    })

    res.json({ success: true, message: `Added to waitlist at position #${position}`, position })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const getWaitlistStatus = async (req, res) => {
  try {
    const { userId } = req
    const waitlistItems = await waitlistModel.find({ userId, notified: false })
    res.json({ success: true, waitlistItems })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export {
  registerUser, loginUser, getProfile, updateProfile,
  bookAppointment, cancelAppointment, listAppointment,
  paymentRazorpay, verifyRazorpay,
  symptomCheck, getNotifications, markNotificationsRead,
  joinWaitlist, getWaitlistStatus
}
