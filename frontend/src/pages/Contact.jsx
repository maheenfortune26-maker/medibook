import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent! We\'ll get back to you within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title mb-4">Contact Us</h1>
        <p className="text-text-muted max-w-xl mx-auto">Have a question or need help? Our support team is here for you.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {[
            { icon: '📍', title: 'Our Address', info: '54 Sunset Road, San Francisco, CA 94102' },
            { icon: '📞', title: 'Phone', info: '+1 (415) 555-0190' },
            { icon: '✉️', title: 'Email', info: 'support@medibook.com' },
            { icon: '🕐', title: 'Hours', info: 'Mon–Fri: 8AM–8PM\nWeekends: 9AM–5PM' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl shadow-card p-5 flex gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-text-main">{item.title}</h3>
                <p className="text-text-muted text-sm mt-1 whitespace-pre-line">{item.info}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 bg-white rounded-3xl shadow-card p-8">
          <h2 className="text-xl font-bold text-text-main mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-main mb-1 block">Name</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-text-main mb-1 block">Email</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-text-main mb-1 block">Subject</label>
              <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="input-field" placeholder="How can we help?" />
            </div>
            <div>
              <label className="text-sm font-medium text-text-main mb-1 block">Message</label>
              <textarea rows={5} required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-field resize-none" placeholder="Describe your issue or question..." />
            </div>
            <button type="submit" className="btn-primary w-full py-3 font-semibold">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
