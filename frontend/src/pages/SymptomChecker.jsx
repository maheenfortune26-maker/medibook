import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea',
  'Stomach pain', 'Skin rash', 'Dizziness', 'Chest pain', 'Back pain',
  'Shortness of breath', 'Joint pain'
]

const SymptomChecker = () => {
  const navigate = useNavigate()
  const { backendUrl, doctors } = useAppContext()
  const [symptoms, setSymptoms] = useState('')
  const [selected, setSelected] = useState([])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const toggleSymptom = (s) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const combinedSymptoms = [...selected, symptoms].filter(Boolean).join(', ')

  const checkSymptoms = async () => {
    if (!combinedSymptoms.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/symptom-check`, {
        symptoms: combinedSymptoms
      })
      if (data.success) setResult(data.recommendation)
    } catch {
      // Fallback: client-side rule check
      const lower = combinedSymptoms.toLowerCase()
      let speciality = 'General physician'
      let urgency = 'low'
      if (lower.includes('skin') || lower.includes('rash') || lower.includes('acne')) { speciality = 'Dermatologist'; urgency = 'low' }
      else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('dizz')) { speciality = 'Neurologist'; urgency = 'medium' }
      else if (lower.includes('stomach') || lower.includes('nausea') || lower.includes('diarrhea')) { speciality = 'Gastroenterologist'; urgency = 'medium' }
      else if (lower.includes('child') || lower.includes('baby') || lower.includes('infant')) { speciality = 'Pediatricians'; urgency = 'medium' }
      else if (lower.includes('chest') || lower.includes('breath')) { speciality = 'General physician'; urgency = 'high' }
      setResult({
        speciality,
        urgency,
        message: urgency === 'high' ? 'Your symptoms may require immediate attention. Please book an urgent appointment.' : 'Book an appointment with the recommended specialist.',
        symptomsAnalyzed: combinedSymptoms
      })
    } finally {
      setLoading(false)
    }
  }

  const matchedDoctors = result ? doctors.filter(d => d.speciality === result.speciality && d.available) : []

  const urgencyConfig = {
    high: { color: 'bg-red-50 border-red-200 text-red-700', icon: '🚨', label: 'High Urgency' },
    medium: { color: 'bg-yellow-50 border-yellow-200 text-yellow-700', icon: '⚠️', label: 'Moderate Urgency' },
    low: { color: 'bg-green-50 border-green-200 text-green-700', icon: '✅', label: 'Low Urgency' },
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🔬</div>
        <h1 className="text-3xl font-bold text-text-main mb-3">AI Symptom Checker</h1>
        <p className="text-text-muted max-w-xl mx-auto">
          Describe your symptoms and we'll recommend the right specialist for you. This is for guidance only — not a medical diagnosis.
        </p>
      </div>

      {/* Input Panel */}
      <div className="bg-white rounded-3xl shadow-card p-8 mb-6">
        {/* Quick symptom chips */}
        <div className="mb-6">
          <p className="text-sm font-medium text-text-main mb-3">Common symptoms — tap to select:</p>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map(s => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selected.includes(s)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-50 text-text-muted border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Free text input */}
        <div className="mb-6">
          <label className="text-sm font-medium text-text-main mb-2 block">Describe in your own words:</label>
          <textarea
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            rows={4}
            placeholder="e.g. I've had a persistent headache for 3 days, with some dizziness and blurred vision..."
            className="input-field resize-none"
          />
        </div>

        {combinedSymptoms && (
          <div className="mb-5 p-3 bg-primary-light rounded-xl">
            <p className="text-xs text-primary font-medium">Analyzing: {combinedSymptoms}</p>
          </div>
        )}

        <button
          onClick={checkSymptoms}
          disabled={!combinedSymptoms.trim() || loading}
          className="w-full btn-primary py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </>
          ) : (
            <>🔍 Check Symptoms</>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5">
          {/* Urgency alert */}
          <div className={`rounded-2xl p-5 border ${urgencyConfig[result.urgency].color}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{urgencyConfig[result.urgency].icon}</span>
              <div>
                <p className="font-bold">{urgencyConfig[result.urgency].label}</p>
                <p className="text-sm opacity-80">{result.message}</p>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="font-bold text-text-main mb-4 flex items-center gap-2">
              <span className="text-primary">👨‍⚕️</span> Recommended Specialist
            </h2>
            <div className="flex items-center gap-4 p-4 bg-primary-light rounded-xl mb-5">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-2xl text-white">🩺</div>
              <div>
                <h3 className="font-bold text-primary text-lg">{result.speciality}</h3>
                <p className="text-sm text-text-muted">Based on your symptoms</p>
              </div>
            </div>

            {matchedDoctors.length > 0 ? (
              <>
                <p className="text-sm font-medium text-text-main mb-3">Available {result.speciality}s:</p>
                <div className="space-y-3">
                  {matchedDoctors.slice(0, 3).map(doc => (
                    <div key={doc._id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-10 h-10 rounded-lg object-cover"
                          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${doc.name}&background=1A6DC4&color=fff` }}
                        />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <div className="flex items-center gap-1 text-xs text-text-muted">
                            <span className="text-yellow-400">★</span>
                            <span>{doc.rating || '4.8'}</span>
                            <span>· ${doc.fees}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/appointment/${doc._id}`)}
                        className="btn-primary text-xs py-1.5 px-4"
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate(`/doctors/${result.speciality}`)}
                className="btn-primary w-full"
              >
                Find {result.speciality} →
              </button>
            )}
          </div>

          <div className="text-center text-xs text-text-muted p-4 bg-gray-50 rounded-xl">
            ⚕️ This tool provides guidance only and is not a medical diagnosis. For emergencies, call your local emergency services immediately.
          </div>
        </div>
      )}
    </div>
  )
}

export default SymptomChecker
