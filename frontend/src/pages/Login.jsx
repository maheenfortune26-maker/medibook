import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const { token, setToken, backendUrl } = useAppContext()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (token) navigate('/') }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/api/user/login' : '/api/user/register'
      const payload = mode === 'login' ? { email: form.email, password: form.password } : form
      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload)
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!')
      } else {
        toast.error(data.message)
      }
    } catch { toast.error('Something went wrong') } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-primary">Medi<span className="text-text-main">Book</span></span>
          </div>
          <h1 className="text-2xl font-bold text-text-main">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            {mode === 'login' ? 'Sign in to manage your appointments' : 'Join thousands of patients on MediBook'}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-card-hover p-8">
          {/* Toggle */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
            {[['login', 'Sign In'], ['register', 'Create Account']].map(([key, label]) => (
              <button key={key} onClick={() => setMode(key)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === key ? 'bg-white shadow text-primary' : 'text-text-muted'}`}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium text-text-main mb-1 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-text-main mb-1 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-main mb-1 block">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="At least 8 characters"
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3 font-semibold text-base mt-2 disabled:opacity-50">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-text-muted mt-5">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-primary font-medium hover:underline">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
