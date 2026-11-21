import React from 'react'
import { useAdminContext } from '../context/AdminContext'
import { useDoctorContext } from '../context/DoctorContext'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { aToken, setAToken } = useAdminContext()
  const { dToken, setDToken } = useDoctorContext()

  const logout = () => {
    if (aToken) { setAToken(''); localStorage.removeItem('aToken') }
    if (dToken) { setDToken(''); localStorage.removeItem('dToken') }
    toast.success('Logged out')
  }

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
      <div>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {aToken ? '🛡️ Admin' : '👨‍⚕️ Doctor'}
        </span>
      </div>
      <button onClick={logout} className="text-sm text-red-500 border border-red-200 px-4 py-1.5 rounded-xl hover:bg-red-50 transition-colors font-medium">
        Logout
      </button>
    </header>
  )
}

export default Navbar
