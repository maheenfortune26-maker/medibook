import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'

const specialities = [
  'General physician', 'Gynecologist', 'Dermatologist',
  'Pediatricians', 'Neurologist', 'Gastroenterologist'
]

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useAppContext()
  const [filterDocs, setFilterDocs] = useState([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    let filtered = doctors
    if (speciality) filtered = doctors.filter(d => d.speciality === speciality)
    if (search) filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality.toLowerCase().includes(search.toLowerCase())
    )
    if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5))
    if (sortBy === 'fees-low') filtered = [...filtered].sort((a, b) => a.fees - b.fees)
    if (sortBy === 'fees-high') filtered = [...filtered].sort((a, b) => b.fees - a.fees)
    setFilterDocs(filtered)
  }, [doctors, speciality, search, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title mb-2">{speciality || 'All Doctors'}</h1>
        <p className="text-text-muted">Browse and book appointments with our certified specialists</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-card p-4">
            <h3 className="font-semibold text-sm text-text-main mb-3">Speciality</h3>
            <div className="space-y-1">
              <button
                onClick={() => navigate('/doctors')}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${!speciality ? 'bg-primary text-white font-medium' : 'text-text-muted hover:bg-gray-50'}`}
              >
                All Specialities
              </button>
              {specialities.map(spec => (
                <button
                  key={spec}
                  onClick={() => navigate(`/doctors/${spec}`)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${speciality === spec ? 'bg-primary text-white font-medium' : 'text-text-muted hover:bg-gray-50'}`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or speciality..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-field sm:w-44"
            >
              <option value="rating">Top Rated</option>
              <option value="fees-low">Fees: Low to High</option>
              <option value="fees-high">Fees: High to Low</option>
            </select>
          </div>

          <p className="text-text-muted text-sm mb-4">{filterDocs.length} doctor{filterDocs.length !== 1 ? 's' : ''} found</p>

          {filterDocs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filterDocs.map(doc => (
                <DoctorCard key={doc._id} doctor={doc} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-text-main mb-2">No doctors found</h3>
              <p className="text-text-muted text-sm">Try adjusting your search or browse a different speciality</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
