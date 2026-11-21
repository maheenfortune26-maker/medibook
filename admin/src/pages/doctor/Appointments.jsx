import React, { useEffect } from 'react'
import { useDoctorContext } from '../../context/DoctorContext'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const formatDate = (s) => { try { const [d,m,y] = s.split('_'); return `${d} ${months[+m-1]} ${y}` } catch { return s } }

const DoctorAppointments = () => {
  const { appointments, getAppointments, dToken, completeAppointment, cancelAppointment } = useDoctorContext()

  useEffect(() => { if (dToken) getAppointments() }, [dToken])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-500 text-sm">{appointments.length} total appointments</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header border-b border-gray-100">
                <th className="px-5 py-3 text-left">#</th>
                <th className="px-5 py-3 text-left">Patient</th>
                <th className="px-5 py-3 text-left">Date & Time</th>
                <th className="px-5 py-3 text-left">Fee</th>
                <th className="px-5 py-3 text-left">Symptoms</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt, i) => (
                <tr key={apt._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <img src={apt.userData?.image || `https://ui-avatars.com/api/?name=${apt.userData?.name}&background=E8F2FF&color=1A6DC4`} alt="" className="w-9 h-9 rounded-xl object-cover" onError={e => { e.target.src = `https://ui-avatars.com/api/?name=P&background=E8F2FF&color=1A6DC4` }} />
                      <div>
                        <p className="font-medium text-gray-700">{apt.userData?.name}</p>
                        <p className="text-xs text-gray-400">{apt.userData?.gender || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-gray-700">{formatDate(apt.slotDate)}</p>
                    <p className="text-xs text-gray-400">{apt.slotTime}</p>
                  </td>
                  <td className="px-5 py-3 font-medium">${apt.amount}</td>
                  <td className="px-5 py-3 max-w-32">
                    {apt.symptoms
                      ? <span className="text-xs text-gray-500 italic">{apt.symptoms.slice(0, 50)}{apt.symptoms.length > 50 ? '...' : ''}</span>
                      : <span className="text-gray-300 text-xs">None provided</span>
                    }
                  </td>
                  <td className="px-5 py-3">
                    {apt.cancelled
                      ? <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">Cancelled</span>
                      : apt.isCompleted
                      ? <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">Completed</span>
                      : <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Upcoming</span>
                    }
                    {apt.payment && <span className="ml-1 text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">Paid</span>}
                  </td>
                  <td className="px-5 py-3">
                    {!apt.cancelled && !apt.isCompleted && (
                      <div className="flex gap-2">
                        <button onClick={() => completeAppointment(apt._id)} className="text-xs text-green-600 border border-green-200 px-2 py-1 rounded-lg hover:bg-green-50">Done</button>
                        <button onClick={() => cancelAppointment(apt._id)} className="text-xs text-red-500 border border-red-200 px-2 py-1 rounded-lg hover:bg-red-50">Cancel</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {!appointments.length && (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No appointments yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
