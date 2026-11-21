import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/appointment/${doctor._id}`)}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden group"
    >
      <div className="bg-primary-light h-44 overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&background=1A6DC4&color=fff&size=200` }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-gray-300'}`} />
          <span className={`text-xs font-medium ${doctor.available ? 'text-green-600' : 'text-gray-400'}`}>
            {doctor.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <h3 className="font-bold text-text-main text-sm mb-1">{doctor.name}</h3>
        <p className="text-text-muted text-xs">{doctor.speciality}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-medium text-text-main">{doctor.rating || '4.8'}</span>
            <span className="text-xs text-text-muted">({doctor.totalReviews || 0})</span>
          </div>
          <span className="text-xs font-semibold text-primary">${doctor.fees}</span>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
