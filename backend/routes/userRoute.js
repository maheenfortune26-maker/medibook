import express from 'express'
import {
  registerUser, loginUser, getProfile, updateProfile,
  bookAppointment, cancelAppointment, listAppointment,
  paymentRazorpay, verifyRazorpay,
  symptomCheck, getNotifications, markNotificationsRead,
  joinWaitlist, getWaitlistStatus
} from '../controllers/userController.js'
import { authUser } from '../middleware/authMiddleware.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verify-razorpay', authUser, verifyRazorpay)

// NEW FEATURE routes
userRouter.post('/symptom-check', symptomCheck)
userRouter.get('/notifications', authUser, getNotifications)
userRouter.post('/notifications/read', authUser, markNotificationsRead)
userRouter.post('/waitlist/join', authUser, joinWaitlist)
userRouter.get('/waitlist/status', authUser, getWaitlistStatus)

export default userRouter
