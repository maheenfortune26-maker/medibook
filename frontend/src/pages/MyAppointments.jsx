import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyAppointments = () => {
  const navigate = useNavigate()
  const { token, backendUrl, loadNotifications } = useAppContext()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('upcoming')

  const getAppointments = async () => {
    if (!token) return navigate('/login')
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
      if (data.success) setAppointments(data.appointments.reverse())
    } catch { toast.error('Could not load appointments') }
  }

  const cancelAppointment = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    setLoading(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId: id }, { headers: { token } })
      if (data.success) {
        toast.success('Appointment cancelled')
        getAppointments()
        loadNotifications()
      } else toast.error(data.message)
    } catch { toast.error('Could not cancel') } finally { setLoading(false) }
  }

  useEffect(() => { getAppointments() }, [token])

  const upcoming = appointments.filter(a => !a.cancelled && !a.isCompleted)
  const past = appointments.filter(a => a.cancelled || a.isCompleted)
  const display = tab === 'upcoming' ? upcoming : past

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('_')
    return `${day} ${months[parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title mb-2">My Appointments</h1>
      <p className="text-text-muted mb-6">Manage your healthcare appointments</p>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {[['upcoming', `Upcoming (${upcoming.length})`], ['past', `History (${past.length})`]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? 'bg-white shadow text-primary' : 'text-text-muted'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {display.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-card">
          <div className="text-5xl mb-4">{tab === 'upcoming' ? '📅' : '📋'}</div>
          <h3 className="font-semibold text-text-main mb-2">
            {tab === 'upcoming' ? 'No upcoming appointments' : 'No appointment history'}
          </h3>
          <p className="text-text-muted text-sm mb-6">
            {tab === 'upcoming' ? 'Book your first appointment with a specialist' : 'Your completed appointments will appear here'}
          </p>
          <button onClick={() => navigate('/doctors')} className="btn-primary">Find a Doctor</button>
        </div>
      ) : (
        <div className="space-y-4">
          {display.map(apt => (
            <div key={apt._id} className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="p-5 flex flex-col sm:flex-row gap-4">
                <img
                  src={apt.docData?.image}
                  alt={apt.docData?.name}
                  className="w-20 h-20 rounded-xl object-cover object-top bg-primary-light flex-shrink-0"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${apt.docData?.name}&background=1A6DC4&color=fff` }}
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-text-main">{apt.docData?.name}</h3>
                      <p className="text-text-muted text-sm">{apt.docData?.speciality}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {apt.cancelled && <span className="badge-red">Cancelled</span>}
                      {apt.isCompleted && <span className="badge-green">✓ Completed</span>}
                      {!apt.cancelled && !apt.isCompleted && <span className="badge-green">● Confirmed</span>}
                      {apt.payment && <span className="badge-green">💳 Paid</span>}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      📅 {formatDate(apt.slotDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      🕐 {apt.slotTime}
                    </span>
                    <span className="flex items-center gap-1">
                      💲{apt.amount}
                    </span>
                  </div>
                  {apt.symptoms && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg text-xs text-text-muted">
                      <span className="font-medium">Symptoms: </span>{apt.symptoms}
                    </div>
                  )}
                </div>
              </div>
              {!apt.cancelled && !apt.isCompleted && (
                <div className="border-t border-gray-100 px-5 py-3 flex gap-3">
                  {!apt.payment && (
                    <button className="btn-primary text-sm py-2 px-4">
                      Pay Online
                    </button>
                  )}
                  <button
                    onClick={() => cancelAppointment(apt._id)}
                    disabled={loading}
                    className="text-sm text-red-500 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
