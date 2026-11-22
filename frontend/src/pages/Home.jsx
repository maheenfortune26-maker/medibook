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
      {/* Hero Section — full background image like Anaverse */}
      <section className="relative min-h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Full background image */}
        <img
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&h=700&fit=crop&crop=center"
          alt="Hospital"
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=700&fit=crop'
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />

        {/* Logo top-left watermark */}
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
            <span className="text-blue-700 text-xs font-bold">M</span>
          </div>
          <span className="text-white text-sm font-semibold">MediBook</span>
        </div>

        {/* Main content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-5 text-white">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Your Health, Our Priority
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              The Best Service<br />
              <span className="text-cyan-300">for Your Health</span><br />
              and Family
            </h1>
            <p className="text-blue-100 text-base mb-8 max-w-md leading-relaxed">
              We are here with quality medical services, experienced doctors, and modern facilities to provide the best care for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/doctors')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors shadow-lg flex items-center gap-2"
              >
                View Services →
              </button>
              <button
                onClick={() => navigate('/doctors')}
                className="bg-white/20 backdrop-blur-sm border border-white/40 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
              >
                📅 Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip overlapping bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-t-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {['🏥', '👥', '🛏️', '⭐'][i]}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-700">{s.number}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for the overlapping stats strip */}
      <div className="h-20 bg-white" />

      {/* AI Symptom Checker CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

      {/* About section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=450&fit=crop"
              alt="Hospital building"
              className="rounded-3xl shadow-xl w-full object-cover h-72 lg:h-96"
              onError={e => { e.target.style.display = 'none' }}
            />
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🏆</div>
              <div>
                <div className="font-bold text-gray-800">Top Rated</div>
                <div className="text-sm text-gray-500">Healthcare 2024</div>
              </div>
            </div>
          </div>
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">About Us ⓘ</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">MediBook Hospital<br />For a Healthier Life</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We are committed to providing exceptional healthcare services by combining the expertise of certified medical professionals with modern technology, ensuring a comfortable and efficient experience for every patient.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🕐', title: '24-Hour Service', desc: 'Always available for you' },
                { icon: '👨‍⚕️', title: 'Professional Staff', desc: 'Certified specialists' },
                { icon: '🏥', title: 'Modern Facilities', desc: 'State-of-the-art tech' },
                { icon: '❤️', title: 'Quality Care', desc: '98% satisfaction rate' },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{f.title}</div>
                    <div className="text-gray-500 text-xs">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-blue-600 text-sm font-medium mb-1">Our Services</div>
              <h2 className="section-title">Our Services</h2>
            </div>
            <button onClick={() => navigate('/doctors')} className="btn-outline hidden sm:flex">View All Services</button>
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
        </div>
      </section>

      {/* Top Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-blue-600 text-sm font-medium mb-1">Our Doctors</div>
            <h2 className="section-title">Specialist Doctors</h2>
          </div>
          <button onClick={() => navigate('/doctors')} className="btn-outline hidden sm:flex">View All Doctors</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {doctors.slice(0, 4).map(doc => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden py-16">
        <img
          src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1600&h=400&fit=crop&crop=center"
          alt="CTA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-blue-100 mb-8">Join thousands of patients who trust MediBook for their healthcare needs.</p>
          <button onClick={() => navigate('/doctors')} className="bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
            Find a Doctor Now →
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
