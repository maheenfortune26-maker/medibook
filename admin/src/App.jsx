import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAdminContext } from './context/AdminContext'
import { useDoctorContext } from './context/DoctorContext'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AdminDashboard from './pages/admin/Dashboard'
import AllAppointments from './pages/admin/AllAppointments'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorsList from './pages/admin/DoctorsList'
import DoctorDashboard from './pages/doctor/Dashboard'
import DoctorAppointments from './pages/doctor/Appointments'
import DoctorProfile from './pages/doctor/Profile'

const App = () => {
  const { aToken } = useAdminContext()
  const { dToken } = useDoctorContext()

  if (!aToken && !dToken) return <><Login /><ToastContainer /></>

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            {aToken && <>
              <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/appointments" element={<AllAppointments />} />
              <Route path="/admin/add-doctor" element={<AddDoctor />} />
              <Route path="/admin/doctors-list" element={<DoctorsList />} />
            </>}
            {dToken && <>
              <Route path="/" element={<Navigate to="/doctor/dashboard" />} />
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/profile" element={<DoctorProfile />} />
            </>}
          </Routes>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
