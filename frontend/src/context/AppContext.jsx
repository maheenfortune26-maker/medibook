import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

// Fallback static doctors data for demo (when backend not connected)
const staticDoctors = [
  { _id: 'doc1', name: 'Dr. Richard James', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', fees: 50, available: true, rating: 4.8, totalReviews: 124, image: 'https://randomuser.me/api/portraits/men/32.jpg', address: { line1: '17th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.' },
  { _id: 'doc2', name: 'Dr. Emily Larson', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', fees: 60, available: true, rating: 4.9, totalReviews: 89, image: 'https://randomuser.me/api/portraits/women/44.jpg', address: { line1: '27th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Larson specializes in women\'s health and reproductive medicine with compassionate patient care.' },
  { _id: 'doc3', name: 'Dr. Sarah Patel', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', fees: 30, available: true, rating: 4.7, totalReviews: 56, image: 'https://randomuser.me/api/portraits/women/68.jpg', address: { line1: '37th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Patel is dedicated to skin health and dermatological treatment with modern techniques.' },
  { _id: 'doc4', name: 'Dr. Christopher Lee', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', fees: 40, available: true, rating: 4.8, totalReviews: 73, image: 'https://randomuser.me/api/portraits/men/55.jpg', address: { line1: '47th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Lee specializes in children\'s health from newborns to teenagers with gentle and effective care.' },
  { _id: 'doc5', name: 'Dr. Jennifer Garcia', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', fees: 50, available: true, rating: 4.6, totalReviews: 91, image: 'https://randomuser.me/api/portraits/women/22.jpg', address: { line1: '57th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Garcia is an experienced neurologist focusing on brain, spine, and nerve disorders.' },
  { _id: 'doc6', name: 'Dr. Andrew Williams', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', fees: 50, available: true, rating: 4.7, totalReviews: 65, image: 'https://randomuser.me/api/portraits/men/41.jpg', address: { line1: '57th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Williams brings extensive experience in treating neurological conditions with cutting-edge approaches.' },
  { _id: 'doc7', name: 'Dr. Christopher Davis', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', fees: 50, available: true, rating: 4.5, totalReviews: 108, image: 'https://randomuser.me/api/portraits/men/33.jpg', address: { line1: '17th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care.' },
  { _id: 'doc8', name: 'Dr. Timothy White', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', fees: 60, available: false, rating: 4.8, totalReviews: 77, image: 'https://randomuser.me/api/portraits/men/61.jpg', address: { line1: '27th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. White specializes in comprehensive gynecological care and maternal health.' },
  { _id: 'doc9', name: 'Dr. Ava Mitchell', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', fees: 30, available: true, rating: 4.9, totalReviews: 42, image: 'https://randomuser.me/api/portraits/women/82.jpg', address: { line1: '37th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Mitchell is passionate about skin care and helping patients achieve healthy, glowing skin.' },
  { _id: 'doc10', name: 'Dr. Jeffrey King', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', fees: 40, available: true, rating: 4.7, totalReviews: 61, image: 'https://randomuser.me/api/portraits/men/72.jpg', address: { line1: '47th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. King is dedicated to providing exceptional pediatric care.' },
  { _id: 'doc11', name: 'Dr. Zoe Kelly', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', fees: 50, available: true, rating: 4.6, totalReviews: 84, image: 'https://randomuser.me/api/portraits/women/15.jpg', address: { line1: '57th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Kelly treats complex neurological disorders with empathy and expertise.' },
  { _id: 'doc12', name: 'Dr. Patrick Harris', speciality: 'Gastroenterologist', degree: 'MBBS', experience: '4 Years', fees: 50, available: true, rating: 4.8, totalReviews: 95, image: 'https://randomuser.me/api/portraits/men/48.jpg', address: { line1: '57th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Harris specializes in digestive health, treating conditions from GERD to complex GI disorders.' },
  { _id: 'doc13', name: 'Dr. Chloe Evans', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', fees: 50, available: true, rating: 4.7, totalReviews: 115, image: 'https://randomuser.me/api/portraits/women/36.jpg', address: { line1: '17th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Evans provides holistic primary care services.' },
  { _id: 'doc14', name: 'Dr. Ryan Martinez', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', fees: 60, available: true, rating: 4.5, totalReviews: 68, image: 'https://randomuser.me/api/portraits/men/27.jpg', address: { line1: '27th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Martinez is committed to women\'s reproductive health and wellness.' },
  { _id: 'doc15', name: 'Dr. Amelia Hill', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', fees: 30, available: true, rating: 4.8, totalReviews: 39, image: 'https://randomuser.me/api/portraits/women/59.jpg', address: { line1: '37th Cross, Richmond', line2: 'Ring Road, London' }, about: 'Dr. Hill is an emerging dermatologist with fresh perspectives on modern skin care.' },
]

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState(staticDoctors)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [userData, setUserData] = useState(null)
  const [notifications, setNotifications] = useState([])

  const getDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`)
      if (data.success) setDoctors(data.doctors)
    } catch {
      // Use static data as fallback
    }
  }

  const loadUserProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token }
      })
      if (data.success) setUserData(data.userData)
    } catch (error) {
      console.log(error)
    }
  }

  const loadNotifications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/notifications`, {
        headers: { token }
      })
      if (data.success) setNotifications(data.notifications)
    } catch { /* silent */ }
  }

  useEffect(() => { getDoctors() }, [])
  useEffect(() => {
    if (token) {
      loadUserProfile()
      loadNotifications()
    }
  }, [token])

  const value = {
    doctors, getDoctors, backendUrl,
    token, setToken,
    userData, setUserData, loadUserProfile,
    notifications, setNotifications, loadNotifications
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
export default AppContextProvider
