import React, { useState } from 'react'
import { useAdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const specialities = ['General physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist']

const AddDoctor = () => {
  const { aToken, backendUrl } = useAdminContext()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '', speciality: 'General physician',
    degree: '', experience: '1 Year', fees: '', about: '',
    address1: '', address2: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) return toast.warning('Please upload a doctor photo')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'address1' || k === 'address2') return
        formData.append(k, v)
      })
      formData.append('address', JSON.stringify({ line1: form.address1, line2: form.address2 }))

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { atoken: aToken } })
      if (data.success) {
        toast.success('Doctor added successfully!')
        setForm({ name: '', email: '', password: '', speciality: 'General physician', degree: '', experience: '1 Year', fees: '', about: '', address1: '', address2: '' })
        setImage(null)
      } else toast.error(data.message)
    } catch { toast.error('Failed to add doctor') } finally { setLoading(false) }
  }

  const Field = ({ label, name, type = 'text', options, ...props }) => (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
      {options ? (
        <select value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} className="input-field">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} className="input-field" required {...props} />
      )}
    </div>
  )

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Doctor</h1>
        <p className="text-gray-500 text-sm">Fill in the details to register a new doctor</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-card p-6 mb-5">
          {/* Photo upload */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
            <label className="cursor-pointer">
              <div className="w-24 h-24 rounded-2xl bg-primary-light border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden hover:border-primary transition-colors">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="text-2xl mb-1">📷</div>
                    <div className="text-xs text-primary font-medium">Upload Photo</div>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
            </label>
            <div>
              <p className="font-medium text-gray-700 mb-1">Doctor Profile Photo</p>
              <p className="text-sm text-gray-400">JPG, PNG or WEBP. Max 5MB</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" name="name" placeholder="Dr. John Smith" />
            <Field label="Email" name="email" type="email" placeholder="doctor@hospital.com" />
            <Field label="Password" name="password" type="password" placeholder="Min. 8 characters" />
            <Field label="Speciality" name="speciality" options={specialities} />
            <Field label="Degree" name="degree" placeholder="MBBS, MD, etc." />
            <Field label="Experience" name="experience" options={['1 Year','2 Years','3 Years','4 Years','5 Years','6 Years','7 Years','8 Years','9 Years','10+ Years']} />
            <Field label="Consultation Fee ($)" name="fees" type="number" placeholder="50" />
          </div>

          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700 mb-1 block">About</label>
            <textarea
              rows={4}
              value={form.about}
              onChange={e => setForm({ ...form, about: e.target.value })}
              className="input-field resize-none"
              placeholder="Doctor's background, expertise, and approach to care..."
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            <Field label="Address Line 1" name="address1" placeholder="Street address" />
            <Field label="Address Line 2" name="address2" placeholder="City, Country" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary px-8 py-3 font-semibold disabled:opacity-50">
          {loading ? 'Adding Doctor...' : 'Add Doctor'}
        </button>
      </form>
    </div>
  )
}

export default AddDoctor
