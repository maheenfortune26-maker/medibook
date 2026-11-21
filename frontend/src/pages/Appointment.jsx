import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, token, backendUrl, getDoctors, loadNotifications } = useAppContext()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(false)
  const [relatedDocs, setRelatedDocs] = useState([])

  useEffect(() => {
    const doc = doctors.find(d => d._id === docId)
    if (doc) {
      setDocInfo(doc)
      setRelatedDocs(doctors.filter(d => d.speciality === doc.speciality && d._id !== docId).slice(0, 3))
    }
  }, [docId, doctors])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo])

  const getAvailableSlots = () => {
    const today = new Date()
    const slots = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      const timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`
        const isBooked = docInfo.slots_booked?.[slotDate]?.includes(formattedTime)
        timeSlots.push({ datetime: new Date(currentDate), time: formattedTime, booked: isBooked })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      slots.push(timeSlots)
    }
    setDocSlots(slots)
  }

  const bookAppointment = async () => {
    if (!token) return navigate('/login')
    if (!slotTime) return toast.warning('Please select a time slot')

    setLoading(true)
    try {
      const date = docSlots[slotIndex][0].datetime
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const slotDate = `${day}_${month}_${year}`

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime, symptoms },
        { headers: { token } }
      )

      if (data.success) {
        toast.success('Appointment booked successfully!')
        getDoctors()
        loadNotifications()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const joinWaitlist = async (slot) => {
    if (!token) return navigate('/login')
    setLoading(true)
    try {
      const date = docSlots[slotIndex][0].datetime
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const slotDate = `${day}_${month}_${year}`

      const { data } = await axios.post(
        `${backendUrl}/api/user/waitlist/join`,
        { docId, slotDate, slotTime: slot.time },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(`Added to waitlist at position #${data.position}`)
        loadNotifications()
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error('Could not join waitlist')
    } finally {
      setLoading(false)
    }
  }

  if (!docInfo) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
    </div>
  )

  const selectedDate = docSlots[slotIndex]?.[0]?.datetime || new Date()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Doctor Info */}
      <div className="bg-white rounded-3xl shadow-card overflow-hidden mb-6">
        <div className="md:flex">
          <div className="md:w-64 bg-primary-light">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-64 md:h-full object-cover object-top"
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${docInfo.name}&background=1A6DC4&color=fff&size=300` }}
            />
          </div>
          <div className="flex-1 p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-text-main">{docInfo.name}</h1>
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mb-4">
                  <span className="flex items-center gap-1">🎓 {docInfo.degree} · {docInfo.speciality}</span>
                  <span className="bg-primary-light text-primary px-2 py-0.5 rounded-full text-xs font-medium">{docInfo.experience}</span>
                </div>
                <div className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${docInfo.available ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${docInfo.available ? 'bg-green-400' : 'bg-gray-400'}`} />
                  {docInfo.available ? 'Available for Appointments' : 'Currently Unavailable'}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end mb-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold">{docInfo.rating || '4.8'}</span>
                  <span className="text-text-muted text-sm">({docInfo.totalReviews || 0} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-primary">${docInfo.fees}</div>
                <div className="text-xs text-text-muted">per consultation</div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-1">
                About
                <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">{docInfo.about}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6 text-sm text-text-muted">
                <span>📍 {docInfo.address?.line1}, {docInfo.address?.line2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking Panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Date Selection */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="font-semibold text-text-main mb-4">Select Date & Time</h2>

            {/* Days */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
              {docSlots.map((day, index) => {
                const date = day[0]?.datetime || new Date()
                return (
                  <button
                    key={index}
                    onClick={() => { setSlotIndex(index); setSlotTime('') }}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-colors ${slotIndex === index ? 'bg-primary text-white' : 'bg-gray-50 text-text-muted hover:bg-gray-100'}`}
                  >
                    <span className="text-xs font-medium">{daysOfWeek[date.getDay()]}</span>
                    <span className="text-lg font-bold">{date.getDate()}</span>
                  </button>
                )
              })}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {docSlots[slotIndex]?.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => !slot.booked && setSlotTime(slot.time)}
                  disabled={slot.booked}
                  className={`py-2 px-3 rounded-xl text-xs font-medium transition-colors ${
                    slot.booked
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : slotTime === slot.time
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 text-text-muted hover:bg-primary-light hover:text-primary'
                  }`}
                >
                  {slot.time}
                  {slot.booked && <span className="block text-xs opacity-70">Booked</span>}
                </button>
              ))}
            </div>

            {/* Waitlist option for booked slots */}
            {slotTime && docSlots[slotIndex]?.find(s => s.time === slotTime && s.booked) && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-700 font-medium mb-2">This slot is fully booked.</p>
                <button onClick={() => joinWaitlist({ time: slotTime })} className="text-sm text-yellow-700 underline">
                  Join Waitlist →
                </button>
              </div>
            )}
          </div>

          {/* Symptom Pre-screening (NEW FEATURE) */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔬</span>
              <h2 className="font-semibold text-text-main">Describe Your Symptoms</h2>
              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">Optional</span>
            </div>
            <p className="text-text-muted text-sm mb-3">Help your doctor prepare by describing your symptoms in advance.</p>
            <textarea
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
              rows={3}
              placeholder="e.g. I have been experiencing headaches and dizziness for the past week..."
              className="input-field resize-none"
            />
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            disabled={loading || !slotTime}
            className="w-full btn-primary py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </div>

        {/* Sidebar - related doctors */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h3 className="font-semibold text-sm text-text-main mb-4">Related Doctors</h3>
            {relatedDocs.length > 0 ? (
              <div className="space-y-3">
                {relatedDocs.map(doc => (
                  <div
                    key={doc._id}
                    onClick={() => navigate(`/appointment/${doc._id}`)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${doc.name}&background=1A6DC4&color=fff` }}
                    />
                    <div>
                      <p className="text-sm font-medium text-text-main">{doc.name}</p>
                      <p className="text-xs text-text-muted">{doc.speciality}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-sm text-center py-4">No related doctors</p>
            )}
          </div>

          {/* Appointment info */}
          <div className="bg-primary-light rounded-2xl p-5">
            <h3 className="font-semibold text-sm text-primary mb-3">What to expect</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Instant booking confirmation</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Reminder notification sent</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Free cancellation up to 1hr before</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Secure online payment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment
