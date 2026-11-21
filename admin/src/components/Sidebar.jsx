import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAdminContext } from '../context/AdminContext'
import { useDoctorContext } from '../context/DoctorContext'

const AdminNav = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
  { label: 'Appointments', path: '/admin/appointments', icon: '📅' },
  { label: 'Add Doctor', path: '/admin/add-doctor', icon: '➕' },
  { label: 'Doctors List', path: '/admin/doctors-list', icon: '👨‍⚕️' },
]

const DoctorNav = [
  { label: 'Dashboard', path: '/doctor/dashboard', icon: '📊' },
  { label: 'Appointments', path: '/doctor/appointments', icon: '📅' },
  { label: 'My Profile', path: '/doctor/profile', icon: '👤' },
]

const Sidebar = () => {
  const { aToken } = useAdminContext()
  const { dToken } = useDoctorContext()
  const navItems = aToken ? AdminNav : DoctorNav

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">❤</span>
          </div>
          <div>
            <div className="font-bold text-gray-800 text-sm">MediBook</div>
            <div className="text-xs text-gray-400">{aToken ? 'Admin Panel' : 'Doctor Portal'}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-gray-100">
        <div className="text-xs text-gray-400 text-center">MediBook v1.0</div>
      </div>
    </aside>
  )
}

export default Sidebar
