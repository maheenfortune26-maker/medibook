import React, { useEffect, useState } from 'react'
import { useDoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

const DoctorProfile = () => {
  const { profileData, setProfileData, getProfileData, dToken, backendUrl } = useDoctorContext()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (dToken) getProfileData() }, [dToken])

  const updateProfile = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('fees', profileData.fees)
      formData.append('address', JSON.stringify(profileData.address))
      formData.append('available', profileData.available)
      formData.append('about', profileData.about)
      formData.append('customSchedule', JSON.stringify(profileData.customSchedule))

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, formData, { headers: { dtoken: dToken } })
      if (data.success) { toast.success('Profile updated!'); setIsEdit(false); getProfileData() }
      else toast.error(data.message)
    } catch { toast.error('Could not update profile') } finally { setLoading(false) }
  }

  const toggleDay = (day) => {
    setProfileData({
      ...profileData,
      customSchedule: {
        ...profileData.customSchedule,
        [day]: { ...profileData.customSchedule[day], active: !profileData.customSchedule[day]?.active }
      }
    })
  }

  const updateTime = (day, field, value) => {
    setProfileData({
      ...profileData,
      customSchedule: {
        ...profileData.customSchedule,
        [day]: { ...profileData.customSchedule[day], [field]: value }
      }
    })
  }

  if (!profileData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
    </div>
  )

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 text-sm">Manage your profile and availability</p>
        </div>
        {!isEdit
          ? <button onClick={() => setIsEdit(true)} className="btn-primary">Edit Profile</button>
          : <div className="flex gap-2">
              <button onClick={updateProfile} disabled={loading} className="btn-primary disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
              <button onClick={() => { setIsEdit(false); getProfileData() }} className="btn-outline">Cancel</button>
            </div>
        }
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-5">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="w-20 h-20 rounded-2xl object-cover object-top bg-primary-light"
            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${profileData.name}&background=1A6DC4&color=fff` }}
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
            <p className="text-gray-500 text-sm">{profileData.degree} · {profileData.speciality}</p>
            <p className="text-gray-400 text-xs mt-1">{profileData.experience} experience</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">Consultation Fee</label>
            {isEdit
              ? <input type="number" value={profileData.fees} onChange={e => setProfileData({ ...profileData, fees: e.target.value })} className="input-field" />
              : <p className="font-semibold text-primary text-lg">${profileData.fees}</p>
            }
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">Status</label>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${profileData.available ? 'text-green-600' : 'text-gray-400'}`}>
                {profileData.available ? 'Available' : 'Unavailable'}
              </span>
              {isEdit && (
                <button
                  onClick={() => setProfileData({ ...profileData, available: !profileData.available })}
                  className={`w-10 h-5 rounded-full transition-colors relative ${profileData.available ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${profileData.available ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">About</label>
          {isEdit
            ? <textarea rows={3} value={profileData.about} onChange={e => setProfileData({ ...profileData, about: e.target.value })} className="input-field resize-none" />
            : <p className="text-gray-600 text-sm leading-relaxed">{profileData.about}</p>
          }
        </div>
      </div>

      {/* NEW FEATURE 3: Availability Calendar */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl">📅</span>
          <div>
            <h3 className="font-semibold text-gray-800">Weekly Schedule</h3>
            <p className="text-xs text-gray-400">Set your availability for each day</p>
          </div>
          <span className="ml-auto text-xs bg-primary-light text-primary px-2 py-1 rounded-full font-medium">New Feature</span>
        </div>

        <div className="space-y-3">
          {days.map(day => {
            const schedule = profileData.customSchedule?.[day] || { active: false, startTime: '10:00', endTime: '18:00' }
            return (
              <div key={day} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${schedule.active ? 'bg-primary-light' : 'bg-gray-50'}`}>
                <button
                  onClick={() => isEdit && toggleDay(day)}
                  className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${schedule.active ? 'bg-primary' : 'bg-gray-300'} ${!isEdit ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${schedule.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>

                <span className={`text-sm font-medium w-20 capitalize ${schedule.active ? 'text-primary' : 'text-gray-400'}`}>
                  {day.slice(0, 3).toUpperCase()}
                </span>

                {schedule.active ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={schedule.startTime}
                      onChange={e => isEdit && updateTime(day, 'startTime', e.target.value)}
                      disabled={!isEdit}
                      className={`text-sm border rounded-lg px-2 py-1 ${isEdit ? 'border-primary/30 focus:border-primary focus:outline-none' : 'border-transparent bg-transparent'}`}
                    />
                    <span className="text-gray-400 text-sm">to</span>
                    <input
                      type="time"
                      value={schedule.endTime}
                      onChange={e => isEdit && updateTime(day, 'endTime', e.target.value)}
                      disabled={!isEdit}
                      className={`text-sm border rounded-lg px-2 py-1 ${isEdit ? 'border-primary/30 focus:border-primary focus:outline-none' : 'border-transparent bg-transparent'}`}
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Not available</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
