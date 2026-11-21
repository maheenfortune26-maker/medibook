import React, { useEffect } from 'react'
import { useAdminContext } from '../../context/AdminContext'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const formatDate = (s) => { try { const [d,m,y] = s.split('_'); return `${d} ${months[+m-1]} ${y}` } catch { return s } }

const AllAppointments = () => {
  const { appointments, getAllAppointments, cancelAppointment, aToken } = useAdminContext()

  useEffect(() => { if (aToken) getAllAppointments() }, [aToken])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Appointments</h1>
        <p className="text-gray-500 text-sm">{appointments.length} total appointments</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header border-b border-gray-100">
                <th className="px-5 py-3 text-left">#</th>
                <th className="px-5 py-3 text-left">Patient</th>
                <th className="px-5 py-3 text-left">Doctor</th>
                <th className="px-5 py-3 text-left">Date & Time</th>
                <th className="px-5 py-3 text-left">Fee</th>
                <th className="px-5 py-3 text-left">Payment</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt, i) => (
                <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <img src={apt.userData?.image || `https://ui-avatars.com/api/?name=${apt.userData?.name}&background=E8F2FF&color=1A6DC4`} alt="" className="w-8 h-8 rounded-lg object-cover" onError={e => { e.target.src = `https://ui-avatars.com/api/?name=P&background=E8F2FF&color=1A6DC4` }} />
                      <span className="font-medium text-gray-700">{apt.userData?.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <img src={apt.docData?.image} alt="" className="w-8 h-8 rounded-lg object-cover bg-primary-light" onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${apt.docData?.name}&background=1A6DC4&color=fff` }} />
                      <div>
                        <p className="font-medium text-gray-700">{apt.docData?.name}</p>
                        <p className="text-xs text-gray-400">{apt.docData?.speciality}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    <div>{formatDate(apt.slotDate)}</div>
                    <div className="text-xs text-gray-400">{apt.slotTime}</div>
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-700">${apt.amount}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${apt.payment ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                      {apt.payment ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {apt.cancelled
                      ? <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">Cancelled</span>
                      : apt.isCompleted
                      ? <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">Completed</span>
                      : <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Upcoming</span>
                    }
                  </td>
                  <td className="px-5 py-3">
                    {!apt.cancelled && !apt.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(apt._id)}
                        className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!appointments.length && (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">No appointments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllAppointments
