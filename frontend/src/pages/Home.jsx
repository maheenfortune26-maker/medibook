import React from 'react'
import { useNavigate } from 'react-router-dom'
import heroImage from '../assets/D.jfif'
import groupProfiles from '../assets/group_profiles (2).png'
import generalPhysician from '../assets/General_physician (2).svg'
import gynecologist from '../assets/Gynecologist (2).svg'
import dermatologist from '../assets/Dermatologist (2).svg'
import pediatricians from '../assets/Pediatricians (2).svg'
import neurologist from '../assets/Neurologist (2).svg'
import gastroenterologist from '../assets/Gastroenterologist (2).svg'
import appointmentImg from '../assets/appointment_img (2).png'

const specialities = [
  { name: 'General physician', image: generalPhysician },
  { name: 'Gynecologist', image: gynecologist },
  { name: 'Dermatologist', image: dermatologist },
  { name: 'Pediatricians', image: pediatricians },
  { name: 'Neurologist', image: neurologist },
  { name: 'Gastroenterologist', image: gastroenterologist },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero Section */}
      <div className='flex flex-col md:flex-row bg-blue-600 rounded-2xl mx-4 mt-4 overflow-hidden'>
        <div className='flex flex-col justify-center px-8 py-12 md:w-1/2 text-white'>
          <div className='flex items-center gap-3 mb-4'>
            <img src={groupProfiles} alt='patients' className='w-24' />
            <p className='text-sm'>1,00,000+ Patients</p>
          </div>
          <h1 className='text-3xl md:text-4xl font-bold leading-tight mb-4'>
            Book Appointment<br />With Trusted Doctors
          </h1>
          <p className='text-sm mb-6 text-blue-100'>
            Simply browse through our extensive list of trusted doctors, schedule<br />
            your appointment hassle-free.
          </p>
          <button
            onClick={() => navigate('/doctors')}
            className='bg-white text-blue-600 font-semibold px-6 py-3 rounded-full w-fit hover:bg-blue-50 transition'
          >
            Book appointment
          </button>
        </div>
        <div className='md:w-1/2 flex items-end justify-center'>
          <img src={heroImage} alt='doctors' className='w-full h-80 object-cover object-top' />
        </div>
      </div>

      {/* Speciality Section */}
      <div className='py-16 text-center'>
        <h2 className='text-2xl font-bold mb-2'>Find by Speciality</h2>
        <p className='text-gray-500 text-sm mb-8'>
          Simply browse through our extensive list of trusted doctors, schedule<br />
          your appointment hassle-free.
        </p>
        <div className='flex justify-center flex-wrap gap-6'>
          {specialities.map((s) => (
            <div
              key={s.name}
              onClick={() => navigate(`/doctors/${s.name}`)}
              className='flex flex-col items-center cursor-pointer hover:scale-105 transition'
            >
              <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2'>
                <img src={s.image} alt={s.name} className='w-10 h-10' />
              </div>
              <p className='text-xs text-gray-600 w-20 text-center'>{s.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Doctors Section */}
      <div className='py-8 px-4'>
        <h2 className='text-2xl font-bold text-center mb-2'>Top Doctors to Book</h2>
        <p className='text-gray-500 text-sm text-center mb-8'>
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className='text-center'>
          <button
            onClick={() => navigate('/doctors')}
            className='bg-blue-50 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-100 transition'
          >
            More
          </button>
        </div>
      </div>

      {/* CTA Banner */}
      <div className='bg-blue-600 rounded-2xl mx-4 my-8 overflow-hidden flex flex-col md:flex-row items-center'>
        <div className='p-10 text-white md:w-1/2'>
          <h2 className='text-2xl font-bold mb-4'>Book Appointment<br />With 100+ Trusted Doctors</h2>
          <button
            onClick={() => navigate('/login')}
            className='bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition'
          >
            Create account
          </button>
        </div>
        <div className='md:w-1/2'>
          <img src={appointmentImg} alt='appointment' className='w-full h-56 object-cover' />
        </div>
      </div>
    </div>
  )
}

export default Home
