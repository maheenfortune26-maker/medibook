import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'
import heroImage from '../assets/D.jfif'

const specialities = [
  {
    name: 'General Physician',
    route: 'General physician',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: 'Gynecologist',
    route: 'Gynecologist',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12v8M9 17h6" />
        <path d="M7 20c0-2.761 2.239-5 5-5s5 2.239 5 5" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    name: 'Dermatologist',
    route: 'Dermatologist',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9"
      >
        <path d="M12 2C8 2 5 5.5 5 9c0 2.4 1.2 4.5 3 5.7V17h8v-2.3c1.8-1.2 3-3.3 3-5.7 0-3.5-3-7-7-7z" />
        <path d="M9 17v2a3 3 0 006 0v-2" />
        <circle cx="9.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Pediatricians',
    route: 'Pediatricians',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9"
      >
        <path d="M12 2a4 4 0 100 8 4 4 0 000-8z" />
        <path d="M6 21v-2a6 6 0 0112 0v2" />
        <path d="M12 14v3M10.5 16.5h3" />
      </svg>
    ),
  },
  {
    name: 'Neurologist',
    route: 'Neurologist',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9"
      >
        <path d="M9.5 2A6.5 6.5 0 003 8.5c0 2.3 1.2 4.3 3 5.5V21h4v-3h4v3h4v-7c1.8-1.2 3-3.2 3-5.5A6.5 6.5 0 0014.5 2h-5z" />
        <path d="M9 10h.01M15 10h.01M12 13h.01" strokeWidth={2} />
      </svg>
    ),
  },
  {
    name: 'Gastroenterologist',
    route: 'Gastroenterologist',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9"
      >
        <path d="M12 3c-3 0-6 2-6 5 0 1.5.7 2.8 1.8 3.7C6.7 13 6 14.5 6 16c0 2.8 2.7 5 6 5s6-2.2 6-5c0-1.5-.7-3-1.8-4.3C17.3 10.8 18 9.5 18 8c0-3-3-5-6-5z" />
        <path d="M9 10c1 .5 3 .5 4 0" />
        <path d="M9 16c1 .7 5 .7 6 0" />
      </svg>
    ),
  },
]

const stats = [
  { value: '1L+', label: 'Patients Served' },
  { value: '100+', label: 'Trusted Doctors' },
  { value: '20+', label: 'Specialities' },
  { value: '4.9★', label: 'Average Rating' },
]

const Home = () => {
  const navigate = useNavigate()
  const { doctors } = useAppContext()
  const topDoctors = doctors?.slice(0, 8) || []

  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="gradient-hero overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center min-h-[520px]">
            {/* Left text */}
            <div className="flex-1 py-14 lg:py-20 text-white z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium">Doctors available 24/7</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 tracking-tight">
                Book Appointment
                <br />
                <span className="text-sky-300">With Trusted</span> Doctors
              </h1>

              <p className="text-blue-100 text-lg mb-8 max-w-md leading-relaxed">
                Browse our extensive list of certified specialists and schedule your appointment hassle-free.
              </p>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/doctors')} className="btn-white text-base px-8 py-3">
                  Book Appointment
                </button>
                <button
                  onClick={() => navigate('/symptom-checker')}
                  className="border-2 border-white/50 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-200 text-base"
                >
                  Symptom Check
                </button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/20">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-blue-200 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="flex-1 flex items-end justify-center lg:justify-end pt-8 lg:pt-0 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-sky-400/20 blur-3xl" />
              </div>
              <img
                src={heroImage}
                alt="Trusted medical team"
                className="relative z-10 w-full max-w-lg lg:max-w-xl h-[380px] lg:h-[460px] object-cover object-top rounded-t-[2.5rem] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIALITIES ── */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Departments</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mt-2 mb-3">Find by Speciality</h2>
            <p className="text-text-muted max-w-md mx-auto">
              Connect with certified specialists across all major medical departments.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {specialities.map((s) => (
              <div
                key={s.name}
                onClick={() => navigate(`/doctors/${s.route}`)}
                className="speciality-card group"
              >
                <div className="speciality-icon group-hover:shadow-glow">
                  <span className="text-primary group-hover:text-white transition-colors duration-300">
                    {s.icon}
                  </span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-text-main text-center leading-tight group-hover:text-primary transition-colors">
                  {s.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP DOCTORS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main mt-2">Top Doctors to Book</h2>
              <p className="text-text-muted mt-2">Certified specialists ready to help you today.</p>
            </div>
            <button
              onClick={() => navigate('/doctors')}
              className="hidden md:flex items-center gap-2 btn-outline text-sm"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {topDoctors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {topDoctors.map((doc) => (
                <DoctorCard key={doc._id} doctor={doc} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface rounded-3xl border border-blue-50">
              <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-text-main text-lg mb-2">No doctors listed yet</h3>
              <p className="text-text-muted text-sm">Doctors will appear here once added from the admin panel.</p>
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <button onClick={() => navigate('/doctors')} className="btn-primary">
              View All Doctors
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto gradient-hero rounded-3xl overflow-hidden shadow-glow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
            <div className="text-white max-w-lg">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
                Book Appointment
                <br />
                With 100+ Trusted Doctors
              </h2>
              <p className="text-blue-100 mb-8 text-base leading-relaxed">
                Join over 1,00,000 patients who trust MediBook for their healthcare needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/login')} className="btn-white px-8 py-3 text-base">
                  Create Free Account
                </button>
                <button
                  onClick={() => navigate('/doctors')}
                  className="border-2 border-white/50 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all text-base"
                >
                  Browse Doctors
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center w-64 h-64 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm flex-shrink-0">
              <svg className="w-28 h-28 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home