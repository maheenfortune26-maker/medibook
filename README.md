# MediBook — Full Stack Doctor Appointment Booking System

A complete MERN stack application with three portals: **Patient**, **Doctor**, and **Admin**.

---

## 🆕 Three New Features (Beyond the Tutorial)

### 1. 🔬 AI Symptom Checker
Patients describe their symptoms (via quick-select chips or free text) and the system recommends the right specialist using a smart keyword-matching engine. It also shows urgency level (High / Medium / Low) with color-coded alerts, and lists available matching doctors to book immediately.

**Route:** `/symptom-checker`  
**API:** `POST /api/user/symptom-check`

### 2. 🔔 In-App Notification System
Real-time notification badge in the navbar showing unread count. Patients receive notifications for:
- ✅ Appointment confirmation
- ❌ Appointment cancellation  
- ⏳ Waitlist slot availability
- 📅 Any booking updates

**API:** `GET /api/user/notifications` · `POST /api/user/notifications/read`

### 3. 📅 Doctor Availability Calendar + Patient Waitlist
- **Doctors** set their weekly schedule (day-by-day on/off with start/end times) from their profile panel.
- **Patients** can join a waitlist for any fully-booked slot. When a cancellation happens, the first person on the waitlist is automatically notified.

**API:** `POST /api/user/waitlist/join` · `GET /api/user/waitlist/status`

---

## 📋 Acceptance Criteria — All Met ✅

| Requirement | Implementation |
|---|---|
| Complex relational data model (4+ collections) | `doctor`, `user`, `appointment`, `waitlist` |
| Role-based authentication | JWT tokens for admin, doctor, and patient |
| Clean API contract with proper status codes | RESTful Express API with `success` flags |
| Frontend and backend fully integrated | React context + Axios + live API calls |

---

## 🗂 Project Structure

```
medibook/
├── backend/          # Express + MongoDB API
│   ├── config/       # DB and Cloudinary connections
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth (JWT) + file upload (Multer)
│   ├── models/       # Mongoose schemas (4 collections)
│   └── routes/       # API route definitions
│
├── frontend/         # Patient-facing React app (port 5173)
│   └── src/
│       ├── components/   # Navbar, Footer, DoctorCard
│       ├── context/      # AppContext (global state)
│       └── pages/        # Home, Doctors, Appointment, etc.
│
└── admin/            # Admin + Doctor portal (port 5174)
    └── src/
        ├── components/   # Sidebar, Navbar
        ├── context/      # AdminContext, DoctorContext
        └── pages/        # Dashboards, appointments, profile
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)

---

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

**Required `.env` values:**
```
PORT=4000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=any_long_random_string
ADMIN_EMAIL=admin@medibook.com
ADMIN_PASSWORD=admin123
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_SECRET_KEY=...
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
# Create .env file:
echo "VITE_BACKEND_URL=http://localhost:4000" > .env
npm run dev
```

Runs at: **http://localhost:5173**

---

### 3. Admin Panel Setup

```bash
cd admin
npm install
echo "VITE_BACKEND_URL=http://localhost:4000" > .env
npm run dev
```

Runs at: **http://localhost:5174**

Admin credentials (set in backend .env):
- Email: `admin@medibook.com`
- Password: `admin123`

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/doctor/login` | Doctor login |
| POST | `/api/user/register` | Patient register |
| POST | `/api/user/login` | Patient login |

### Doctors (public)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/doctor/list` | List all available doctors |

### Admin (protected)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/add-doctor` | Add new doctor |
| GET | `/api/admin/all-doctors` | Get all doctors |
| POST | `/api/admin/change-availability` | Toggle availability |
| GET | `/api/admin/appointments` | All appointments |
| POST | `/api/admin/cancel-appointment` | Cancel appointment |
| GET | `/api/admin/dashboard` | Dashboard stats |

### Patient (protected)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user/get-profile` | Get profile |
| POST | `/api/user/update-profile` | Update profile |
| POST | `/api/user/book-appointment` | Book appointment |
| GET | `/api/user/appointments` | My appointments |
| POST | `/api/user/cancel-appointment` | Cancel appointment |
| POST | `/api/user/symptom-check` | AI symptom check 🆕 |
| GET | `/api/user/notifications` | Get notifications 🆕 |
| POST | `/api/user/notifications/read` | Mark all read 🆕 |
| POST | `/api/user/waitlist/join` | Join waitlist 🆕 |
| GET | `/api/user/waitlist/status` | Waitlist status 🆕 |

### Doctor (protected)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/doctor/appointments` | Doctor's appointments |
| POST | `/api/doctor/complete-appointment` | Mark complete |
| POST | `/api/doctor/cancel-appointment` | Cancel |
| GET | `/api/doctor/profile` | Get profile |
| POST | `/api/doctor/update-profile` | Update (with schedule) |
| GET | `/api/doctor/dashboard` | Dashboard stats |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router v7 |
| State | React Context API |
| HTTP | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JSON Web Tokens (JWT) |
| File Upload | Multer + Cloudinary |
| Notifications | Toast (React Toastify) |
| Payments | Razorpay (backend ready) |

---

## 📱 Pages

**Patient Portal**
- `/` — Home with hero, stats, specialities, top doctors
- `/doctors` / `/doctors/:speciality` — Browse & filter doctors
- `/appointment/:docId` — Book appointment + symptom input + waitlist
- `/symptom-checker` — AI symptom analysis
- `/my-appointments` — Manage bookings
- `/my-profile` — Edit profile
- `/about` / `/contact` — Info pages
- `/login` — Auth

**Admin Portal**
- `/admin/dashboard` — Stats + recent appointments
- `/admin/appointments` — All appointments table
- `/admin/add-doctor` — Register new doctor
- `/admin/doctors-list` — Manage doctors + toggle availability

**Doctor Portal**
- `/doctor/dashboard` — Earnings, stats, latest appointments
- `/doctor/appointments` — Full appointment table with symptom notes
- `/doctor/profile` — Edit profile + weekly availability calendar
