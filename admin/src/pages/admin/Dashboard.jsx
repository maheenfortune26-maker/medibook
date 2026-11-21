import React, { useEffect } from 'react'
import { useAdminContext } from '../../context/AdminContext'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const formatDate = (s) => { const [d,m,y] = s.split('_'); return `${d} ${months[+m-1]} ${y}` }

const Dashboard = () => {
  const { dashData, getDashData, cancelAppointment, aToken } = useAdminContext()

  useEffect(() => { if (aToken) getDashData() }, [aToken])

  if (!dashData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
    </div>
  )

  const stats = [
    { label: 'Total Doctors', value: dashData.doctors, icon: '👨‍⚕️', color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Appointments', value: dashData.appointments, icon: '📅', color: 'bg-green-50 text-green-600' },
    { label: 'Total Patients', value: dashData.patients, icon: '🧑‍🤝‍🧑', color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">Overview of MediBook activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-2xl`}>{s.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Appointments</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {dashData.latestAppointments?.map(apt => (
            <div key={apt._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <img
                  src={apt.docData?.image}
                  alt=""
                  className="w-10 h-10 rounded-xl object-cover bg-primary-light"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${apt.docData?.name}&background=1A6DC4&color=fff` }}
                />
                <div>
                  <p className="font-medium text-sm text-gray-800">{apt.docData?.name}</p>
                  <p className="text-xs text-gray-500">{apt.slotDate ? formatDate(apt.slotDate) : ''} · {apt.slotTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {apt.cancelled ? (
                  <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">Cancelled</span>
                ) : apt.isCompleted ? (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Completed</span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(apt._id)}
                    className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
          {!dashData.latestAppointments?.length && (
            <p className="text-center text-gray-400 py-8 text-sm">No appointments yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
