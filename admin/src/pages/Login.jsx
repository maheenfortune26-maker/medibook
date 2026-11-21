import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAdminContext } from '../context/AdminContext'
import { useDoctorContext } from '../context/DoctorContext'

const Login = () => {
  const { setAToken, backendUrl } = useAdminContext()
  const { setDToken } = useDoctorContext()
  const [role, setRole] = useState('admin')
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (role === 'admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, form)
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success('Admin login successful!')
        } else toast.error(data.message)
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, form)
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          toast.success('Doctor login successful!')
        } else toast.error(data.message)
      }
    } catch { toast.error('Login failed') } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MediBook Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Staff & Doctor Access</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Role Toggle */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
            {[['admin', '🛡️ Admin'], ['doctor', '👨‍⚕️ Doctor']].map(([key, label]) => (
              <button key={key} onClick={() => setRole(key)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${role === key ? 'bg-white shadow text-primary' : 'text-gray-500'}`}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" placeholder={role === 'admin' ? 'admin@medibook.com' : 'doctor@medibook.com'} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input-field" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 font-semibold text-base mt-2 disabled:opacity-50">
              {loading ? 'Signing in...' : `Sign In as ${role === 'admin' ? 'Admin' : 'Doctor'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
