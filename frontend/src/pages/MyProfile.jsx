import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfile } = useAppContext()
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateProfile = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      if (image) formData.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } })
      if (data.success) {
        toast.success('Profile updated!')
        await loadUserProfile()
        setIsEdit(false)
        setImage(null)
      } else toast.error(data.message)
    } catch { toast.error('Could not update profile') } finally { setLoading(false) }
  }

  if (!userData) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="section-title mb-6">My Profile</h1>

      <div className="bg-white rounded-3xl shadow-card overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-8 text-white text-center">
          <div className="relative inline-block mb-4">
            <img
              src={image ? URL.createObjectURL(image) : (userData.image || `https://ui-avatars.com/api/?name=${userData.name}&background=fff&color=1A6DC4&size=120`)}
              alt="Profile"
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30"
            />
            {isEdit && (
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-lg flex items-center justify-center cursor-pointer shadow">
                <span className="text-sm">📷</span>
                <input type="file" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
              </label>
            )}
          </div>
          {isEdit ? (
            <input
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
              className="bg-white/20 text-white placeholder-white/70 rounded-xl px-4 py-2 text-center font-bold text-lg w-full max-w-xs"
            />
          ) : (
            <h2 className="text-xl font-bold">{userData.name}</h2>
          )}
          <p className="text-blue-100 text-sm mt-1">{userData.email}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1 block">Phone</label>
              {isEdit
                ? <input value={userData.phone} onChange={e => setUserData({ ...userData, phone: e.target.value })} className="input-field" />
                : <p className="text-text-main font-medium">{userData.phone || '—'}</p>
              }
            </div>
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1 block">Date of Birth</label>
              {isEdit
                ? <input type="date" value={userData.dob} onChange={e => setUserData({ ...userData, dob: e.target.value })} className="input-field" />
                : <p className="text-text-main font-medium">{userData.dob || '—'}</p>
              }
            </div>
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1 block">Gender</label>
              {isEdit
                ? (
                  <select value={userData.gender} onChange={e => setUserData({ ...userData, gender: e.target.value })} className="input-field">
                    <option>Not Selected</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                )
                : <p className="text-text-main font-medium">{userData.gender || '—'}</p>
              }
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1 block">Address</label>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  value={userData.address?.line1}
                  onChange={e => setUserData({ ...userData, address: { ...userData.address, line1: e.target.value } })}
                  className="input-field"
                  placeholder="Address Line 1"
                />
                <input
                  value={userData.address?.line2}
                  onChange={e => setUserData({ ...userData, address: { ...userData.address, line2: e.target.value } })}
                  className="input-field"
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <p className="text-text-main font-medium">
                {userData.address?.line1 ? `${userData.address.line1}, ${userData.address.line2}` : '—'}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {isEdit ? (
              <>
                <button onClick={updateProfile} disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={() => { setIsEdit(false); setImage(null) }} className="btn-outline flex-1">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEdit(true)} className="btn-primary">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
