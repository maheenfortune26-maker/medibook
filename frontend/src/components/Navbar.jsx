import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData, notifications, loadNotifications, backendUrl } = useAppContext()
  const [showMenu, setShowMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    navigate('/login')
    toast.success('Logged out successfully')
  }

  const markAllRead = async () => {
    try {
      await axios.post(`${backendUrl}/api/user/notifications/read`, {}, { headers: { token } })
      loadNotifications()
    } catch { /* silent */ }
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Doctors', path: '/doctors' },
    { label: 'Symptom Check', path: '/symptom-checker' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary">Medi<span className="text-text-main">Book</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-primary bg-primary-light' : 'text-text-muted hover:text-text-main hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {token ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => { setShowNotifications(!showNotifications); if (!showNotifications) markAllRead() }}
                    className="relative p-2 text-text-muted hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-card-hover border border-gray-100 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <span className="font-semibold text-sm">Notifications</span>
                        <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-center text-text-muted py-8 text-sm">No notifications yet</p>
                        ) : (
                          notifications.slice().reverse().slice(0, 10).map((n, i) => (
                            <div key={i} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-primary-light/50' : ''}`}>
                              <div className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                  n.type === 'confirmation' ? 'bg-green-400' :
                                  n.type === 'cancellation' ? 'bg-red-400' :
                                  n.type === 'waitlist' ? 'bg-yellow-400' : 'bg-primary'
                                }`} />
                                <div>
                                  <p className="text-sm font-medium text-text-main">{n.title}</p>
                                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{n.message}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile dropdown */}
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer p-1.5 rounded-xl hover:bg-gray-50 transition-colors">
                    <img
                      src={userData?.image || `https://ui-avatars.com/api/?name=${userData?.name || 'User'}&background=1A6DC4&color=fff`}
                      alt="Profile"
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-card-hover border border-gray-100 z-50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <button onClick={() => navigate('/my-profile')} className="w-full text-left px-3 py-2 text-sm text-text-main hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        My Profile
                      </button>
                      <button onClick={() => navigate('/my-appointments')} className="w-full text-left px-3 py-2 text-sm text-text-main hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        My Appointments
                      </button>
                      <div className="border-t border-gray-100 my-1" />
                      <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="btn-primary text-sm">
                Get Started
              </button>
            )}

            {/* Mobile menu button */}
            <button onClick={() => setShowMenu(!showMenu)} className="md:hidden p-2 rounded-lg text-text-muted hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden border-t border-gray-100 py-3 pb-4">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 text-sm font-medium rounded-lg mx-1 ${isActive ? 'text-primary bg-primary-light' : 'text-text-muted'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
