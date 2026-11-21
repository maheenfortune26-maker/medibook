import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title mb-4">About MediBook</h1>
        <p className="text-text-muted max-w-2xl mx-auto text-lg">
          We're on a mission to make quality healthcare accessible to everyone through technology.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-text-main mb-4">Our Story</h2>
          <p className="text-text-muted mb-4 leading-relaxed">
            MediBook was founded with a simple belief: booking a doctor's appointment should be as easy as ordering food online. We connect patients with verified healthcare professionals, eliminating the frustrating wait times and phone tag.
          </p>
          <p className="text-text-muted mb-6 leading-relaxed">
            Our platform supports over 25,000 patients across 15+ specialities, with a 98% patient satisfaction rate. Every doctor on our platform is verified, credentialed, and committed to excellence.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[['15+', 'Specialities'], ['25,000+', 'Patients'], ['120+', 'Doctors'], ['98%', 'Satisfaction']].map(([n, l]) => (
              <div key={l} className="bg-primary-light rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">{n}</div>
                <div className="text-sm text-text-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white">
          <h3 className="text-xl font-bold mb-6">Why Patients Trust MediBook</h3>
          {[
            ['🔒', 'Privacy First', 'Your health data is encrypted and never shared without consent.'],
            ['✅', 'Verified Doctors', 'All doctors are licensed with valid credentials.'],
            ['⚡', 'Instant Booking', 'Book appointments in under 2 minutes, 24/7.'],
            ['🤖', 'AI-Powered', 'Smart symptom checker guides you to the right specialist.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="flex gap-4 mb-5">
              <span className="text-2xl">{icon}</span>
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-blue-100 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary rounded-3xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Start your healthcare journey today</h2>
        <p className="text-blue-100 mb-6">Join thousands of patients who trust MediBook for their healthcare needs.</p>
        <button onClick={() => navigate('/doctors')} className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors">
          Find a Doctor
        </button>
      </div>
    </div>
  )
}

export default About
