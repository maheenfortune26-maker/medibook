import React, { useEffect } from 'react'
import { useAdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, getAllDoctors, changeAvailability, aToken } = useAdminContext()

  useEffect(() => { if (aToken) getAllDoctors() }, [aToken])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Doctors</h1>
        <p className="text-gray-500 text-sm">{doctors.length} doctors registered</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {doctors.map(doc => (
          <div key={doc._id} className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
            <div className="bg-primary-light h-40 overflow-hidden">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover object-top"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${doc.name}&background=1A6DC4&color=fff&size=200` }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800">{doc.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{doc.speciality}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Available</span>
                  <button
                    onClick={() => changeAvailability(doc._id)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${doc.available ? 'bg-primary' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${doc.available ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <span className="text-sm font-semibold text-primary">${doc.fees}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                {doc.degree} · {doc.experience}
              </div>
            </div>
          </div>
        ))}
        {!doctors.length && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">👨‍⚕️</div>
            <p>No doctors added yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorsList
