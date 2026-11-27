import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'

const specialities = [
  { name: 'General physician', icon: '🩺', color: 'bg-blue-50 text-blue-600' },
  { name: 'Gynecologist', icon: '👩‍⚕️', color: 'bg-pink-50 text-pink-600' },
  { name: 'Dermatologist', icon: '✨', color: 'bg-purple-50 text-purple-600' },
  { name: 'Pediatricians', icon: '🧒', color: 'bg-yellow-50 text-yellow-600' },
  { name: 'Neurologist', icon: '🧠', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Gastroenterologist', icon: '💊', color: 'bg-green-50 text-green-600' },
]

const stats = [
  { number: '15+', label: 'Specialities' },
  { number: '25,000+', label: 'Patients Treated' },
  { number: '120+', label: 'Patient Rooms' },
  { number: '98%', label: 'Patient Satisfaction' },
]

const Home = () => {
  const navigate = useNavigate()
  const { doctors } = useAppContext()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[580px] flex items-center"
        style={{
          background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 60%, #1e3a8a 100%)'
        }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                Your Health, Our Priority
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Expert Medical Care,<br />
                <span className="text-cyan-300">Whenever You Need</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8 max-w-lg leading-relaxed">
                Book appointments with certified specialists instantly. Quality healthcare made accessible for you and your family.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => navigate('/doctors')}
                  className="bg-white text-blue-700 font-semibold px-7 py-3.5 rounded-full hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
                <button
                  onClick={() => navigate('/symptom-checker')}
                  className="border-2 border-white/70 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Check Symptoms
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: '✅', text: 'Verified Doctors' },
                  { icon: '🔒', text: 'Secure & Private' },
                  { icon: '⚡', text: 'Instant Booking' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-blue-100 text-sm">
                    <span>{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: doctor image + stats */}
            <div className="hidden lg:flex flex-col items-end gap-6">
              {/* Doctor image card */}
              <div className="relative">
                <div className="w-80 h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
                    alt="Doctor"
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop' }}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">👨‍⚕️</div>
                  <div>
                    <div className="text-xs text-gray-500">Available Now</div>
                    <div className="text-sm font-bold text-gray-800">500+ Doctors</div>
                  </div>
                </div>
                {/* Rating badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 text-center">
                  <div className="text-yellow-400 text-lg">★★★★★</div>
                  <div className="text-xs font-bold text-gray-700">4.9 / 5.0</div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 w-80">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 text-white">
                    <div className="text-2xl font-bold">{s.number}</div>
                    <div className="text-blue-100 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats mobile */}
      <section className="lg:hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-primary">{s.number}</div>
                <div className="text-text-muted text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏥', title: '24-Hour Service', desc: 'Round the clock care' },
              { icon: '👨‍⚕️', title: 'Professional Staff', desc: 'Certified specialists' },
              { icon: '🔬', title: 'Modern Facilities', desc: 'Latest medical tech' },
              { icon: '❤️', title: 'Quality Care', desc: 'Patient-first approach' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{s.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{s.title}</div>
                  <div className="text-xs text-gray-500">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Symptom Checker CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 border border-blue-100">
          <div className="text-5xl">🔬</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-text-main mb-2">Not sure which doctor to see?</h2>
            <p className="text-text-muted">Use our AI Symptom Checker to get an instant recommendation for the right specialist.</p>
          </div>
          <button onClick={() => navigate('/symptom-checker')} className="btn-primary whitespace-nowrap">
            Check Symptoms →
          </button>
        </div>
      </section>

      {/* Specialities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="section-title mb-3">Browse by Speciality</h2>
          <p className="text-text-muted max-w-xl mx-auto">Find the right specialist for your health needs. Book an appointment in minutes.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialities.map(spec => (
            <button
              key={spec.name}
              onClick={() => navigate(`/doctors/${spec.name}`)}
              className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${spec.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {spec.icon}
              </div>
              <span className="text-xs font-medium text-text-main text-center leading-tight">{spec.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Top Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title mb-2">Our Specialist Doctors</h2>
            <p className="text-text-muted">Our highest-rated healthcare professionals</p>
          </div>
          <button onClick={() => navigate('/doctors')} className="btn-outline hidden sm:flex">
            View All Doctors
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {doctors.slice(0, 8).map(doc => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <button onClick={() => navigate('/doctors')} className="btn-outline">View All Doctors</button>
        </div>
      </section>

      {/* About section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">About Us</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">MediBook — For a Healthier Life</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are committed to providing exceptional healthcare services by combining the expertise of certified medical professionals with modern technology, ensuring a comfortable and efficient experience for every patient.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🕐', title: '24/7 Service', desc: 'Always available for you' },
                  { icon: '👨‍⚕️', title: 'Expert Doctors', desc: 'Certified professionals' },
                  { icon: '🏥', title: 'Modern Facilities', desc: 'State-of-the-art tech' },
                  { icon: '❤️', title: 'Quality Care', desc: '98% satisfaction rate' },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <span className="text-2xl">{f.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{f.title}</div>
                      <div className="text-gray-500 text-xs">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop"
                  alt="Hospital"
                  className="rounded-3xl shadow-2xl w-full object-cover h-80"
                  onError={e => { e.target.style.display = 'none' }}
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">🏆</div>
                  <div>
                    <div className="font-bold text-gray-800">Top Rated</div>
                    <div className="text-sm text-gray-500">Healthcare Provider</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Why Choose MediBook?</h2>
            <p className="text-text-muted max-w-xl mx-auto">We combine medical expertise with modern technology for the best patient experience.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '🕐', title: '24/7 Availability', desc: 'Book appointments any time, day or night.' },
              { icon: '✅', title: 'Verified Doctors', desc: 'All doctors are verified with valid credentials.' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your health data is encrypted and secure.' },
              { icon: '💳', title: 'Easy Payments', desc: 'Multiple secure payment options available.' },
            ].map((f, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-card text-center border border-blue-50 hover:shadow-card-hover transition-shadow">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-text-main mb-2">{f.title}</h3>
                <p className="text-text-muted text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-blue-100 mb-8">Join thousands of patients who trust MediBook for their healthcare needs.</p>
          <button onClick={() => navigate('/doctors')} className="bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
            Find a Doctor Now →
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
