# Full Stack MERN Portfolio Website

A modern, high-performance, glassmorphic Full Stack Portfolio Website engineered with **React 19, Vite, Tailwind CSS v4, Framer Motion, Node.js, Express, MongoDB, Nodemailer, Cloudinary, and JWT Authentication**.

---

## 🌟 Features

- **Frontend (`client`)**:
  - Built with React 19, Vite, and Tailwind CSS v4.
  - Smooth 60fps animations powered by Framer Motion.
  - Sleek Vercel / Linear inspired Glassmorphism UI & Dark/Light mode theme.
  - Interactive custom follower cursor (toggleable).
  - Ambient particle background & scroll progress indicator line.
  - Filterable & searchable Projects section with modal preview.
  - Interactive Skills section with animated percentage progress bars.
  - Career Experience & Education Timeline layout.
  - Verified Certificates gallery with lightbox view.
  - Technical Articles / Blog engine with reading modal.
  - Real-time GitHub Contribution Graph simulation & LeetCode stats card.
  - Dynamic Contact Form with email dispatch (Nodemailer) & MongoDB storage.
  - Responsive Mobile Navigation Drawer & Back-to-Top button.

- **Backend (`server`)**:
  - Express REST API with clean MVC architecture (Controllers, Models, Routes, Middleware).
  - MongoDB & Mongoose Schemas (User, Project, Skill, Experience, Certificate, Blog, Message, Visitor).
  - Admin JWT Authentication & bcrypt password hashing.
  - Automated database seeder (`npm run seed`) creating initial admin user and sample portfolio data.
  - Image upload handler supporting Multer + Cloudinary (with local fallback).
  - Nodemailer email dispatcher for incoming contact inquiries.

- **Admin Panel (`/admin`)**:
  - Protected route requiring JWT login (`admin@portfolio.com` / `admin123`).
  - Real-time stats overview (Total projects, blogs, skills, messages, visitor metrics).
  - Full CRUD management tabs and modals for Projects, Skills, Experience, Certificates, Blogs, and Messages.

---

## 🚀 Quick Start & Local Setup

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Environment Variables (`server/.env`)

Copy `server/.env` or configure the following keys:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ashu_portfolio
JWT_SECRET=super_secret_jwt_key_ashu_portfolio_2026
JWT_EXPIRE=30d

# Cloudinary Setup (Optional)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email Setup (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CONTACT_RECEIVER_EMAIL=your_email@gmail.com
```

### 3. Seed Database & Admin User

Run the database seeder to populate sample projects, skills, experience, certificates, blogs, and create the default admin account:
```bash
cd server
npm run seed
```

Default Admin Credentials:
- **Email:** `admin@portfolio.com`
- **Password:** `admin123`

### 4. Run Development Servers

**Run Server (Port 5000):**
```bash
cd server
npm run dev
```

**Run Client (Port 3000):**
```bash
cd client
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🌐 Deployment Configuration

- **Frontend (Vercel):** Connect your repository to Vercel, set root directory to `client`, build command `npm run build`, output directory `dist`.
- **Backend (Render):** Connect your repository to Render, set root directory to `server`, build command `npm install`, start command `node server.js`. Configure `MONGO_URI` and `JWT_SECRET` in environment variables.
- **Database (MongoDB Atlas):** Create a cluster on MongoDB Atlas and set `MONGO_URI` in `server/.env`.
