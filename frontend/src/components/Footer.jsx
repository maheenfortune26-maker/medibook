import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">MediBook</span>
            </div>
            <p className="text-sm leading-relaxed">Expert medical care, whenever you need it. Connecting patients with certified specialists.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              {['Home', 'About', 'Contact', 'Privacy Policy'].map(l => (
                <div key={l}><button onClick={() => navigate(`/${l === 'Home' ? '' : l.toLowerCase().replace(' ', '-')}`)} className="hover:text-white transition-colors">{l}</button></div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Specialities</h4>
            <div className="space-y-2 text-sm">
              {['General physician', 'Dermatologist', 'Neurologist', 'Gynecologist'].map(s => (
                <div key={s}><button onClick={() => navigate(`/doctors/${s}`)} className="hover:text-white transition-colors">{s}</button></div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>📍 54 Sunset Road, San Francisco</p>
              <p>📞 +1 (415) 555-0190</p>
              <p>✉️ support@medibook.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} MediBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
