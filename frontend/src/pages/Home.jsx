import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'

import header_img from '../asserts/header_img.png'
import group_profiles from '../asserts/group_profiles.png'
import arrow_icon from '../asserts/arrow_icon.svg'
import General_physician from '../asserts/General_physician.svg'
import Gynecologist from '../asserts/Gynecologist.svg'
import Dermatologist from '../asserts/Dermatologist.svg'
import Pediatricians from '../asserts/Pediatricians.svg'
import Neurologist from '../asserts/Neurologist.svg'
import Gastroenterologist from '../asserts/Gastroenterologist.svg'
import appointment_img from '../asserts/appointment_img.png'

const specialities = [
  { name: 'General physician', image: General_physician },
  { name: 'Gynecologist', image: Gynecologist },
  { name: 'Dermatologist', image: Dermatologist },
  { name: 'Pediatricians', image: Pediatricians },
  { name: 'Neurologist', image: Neurologist },
  { name: 'Gastroenterologist', image: Gastroenterologist },
]

const Home = () => {
  const navigate = useNavigate()
  const { doctors } = useAppContext()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 rounded-b-[40px] mx-4 mt-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-8 py-12">
          {/* Left */}
          <div className="flex-1 text-white">
            <div className="flex items-center gap-3 mb-4">
              <img src={group_profiles} alt="patients" className="w-28" />
              <div className="text-sm text-blue-100">
                <span className="font-semibold text-white">1,00,000+</span> Patients
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Book Appointment<br />
              With Trusted Doctors
            </h1>
            <p className="text-blue-100 mb-8 max-w-md text-sm leading-relaxed">
              Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
            <button
              onClick={() => navigate('/doctors')}
              className="flex items-center gap-2 bg-white text-primary font-semibold px-7 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-md"
            >
              Book appointment
              <img src={arrow_icon} alt="" className="w-4 h-4" />
            </button>
          </div>
          {/* Right — header image */}
          <div className="flex-1 flex justify-center">
            <img
              src={header_img}
              alt="Doctors"
              className="w-full max-w-sm lg:max-w-md object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Specialities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Find by Speciality</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {specialities.map(spec => (
            <button
              key={spec.name}
              onClick={() => navigate(`/doctors/${spec.name}`)}
              className="flex flex-col items-center gap-3 p-4 hover:-translate-y-2 transition-transform duration-200 group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <img src={spec.image} alt={spec.name} className="w-14 h-14 object-contain" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center w-20 leading-tight">{spec.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Top Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Top Doctors to Book</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {doctors.slice(0, 10).map(doc => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/doctors')}
            className="bg-blue-50 text-primary font-medium px-8 py-3 rounded-full hover:bg-blue-100 transition-colors"
          >
            more
          </button>
        </div>
      </section>

      {/* AI Symptom Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 border border-blue-100">
          <div className="text-5xl">🔬</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Not sure which doctor to see?</h2>
            <p className="text-gray-500 text-sm">Use our AI Symptom Checker to get an instant recommendation for the right specialist.</p>
          </div>
          <button onClick={() => navigate('/symptom-checker')} className="btn-primary whitespace-nowrap">
            Check Symptoms →
          </button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="flex-1 p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Book Appointment<br />With 100+ Trusted Doctors</h2>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-primary font-semibold px-7 py-3 rounded-full hover:bg-blue-50 transition-colors mt-2"
            >
              Create account
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <img
              src={appointment_img}
              alt="Appointment"
              className="w-full max-w-xs object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
