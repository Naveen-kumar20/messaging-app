# 💬 Talkyy — Real-Time Messaging App

A full-stack real-time chat application built with the MERN stack and Socket.IO.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blueviolet)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black)
![License](https://img.shields.io/badge/License-ISC-green)

---

## ✨ Features

- 🔐 **Authentication** — Secure signup/login with JWT stored in HTTP-only cookies
- 💬 **Real-Time Messaging** — Instant messaging powered by Socket.IO
- 🟢 **Online Status** — See which users are currently online
- 🖼️ **Image Sharing** — Send images in chat (uploaded via Cloudinary)
- 👤 **Profile Management** — Update profile picture and info
- 🎨 **Theming** — Multiple UI themes powered by DaisyUI
- 📱 **Responsive Design** — Works on mobile and desktop

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version |
|---|---|
| React | 19 |
| Vite | 7 |
| Tailwind CSS | 4 |
| DaisyUI | 5 |
| Zustand | 5 |
| Socket.IO Client | 4 |
| Axios | 1 |
| React Router DOM | 7 |

### Backend
| Technology | Version |
|---|---|
| Node.js + Express | 5 |
| MongoDB + Mongoose | 9 |
| Socket.IO | 4 |
| JSON Web Token | 9 |
| bcryptjs | 3 |
| Cloudinary | 2 |

---

## 📁 Project Structure

```
messaging-app/
├── backend/
│   └── src/
│       ├── config/         # DB & Cloudinary config
│       ├── controllers/    # Auth & message logic
│       ├── middleware/     # Auth middleware
│       ├── models/         # User & Message schemas
│       ├── routes/         # API routes
│       ├── lib/            # Socket.IO & JWT utils
│       └── index.js        # Entry point
├── frontend/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Route-level pages
│       ├── store/          # Zustand state management
│       └── lib/            # Axios instance
└── package.json            # Root scripts (build & start)
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- Cloudinary account

### 1. Clone the repository
```bash
git clone https://github.com/Naveen-kumar20/messaging-app.git
cd messaging-app
```

### 2. Install dependencies & build frontend
```bash
npm run build
```

### 3. Start the server
```bash
npm start
```

The app will be available at `http://localhost:5001`

---

## 🧑‍💻 Development Mode

Run frontend and backend separately for hot-reloading:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5001`.

---

## 📜 Available Scripts (Root)

| Script | Description |
|---|---|
| `npm run build` | Installs all deps and builds the frontend |
| `npm start` | Starts the production Express server |

---

## 🌐 Deployment

Set the following environment variables on your hosting platform:

```env
NODE_ENV=production
MONGODB_URI=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Then run `npm run build` and `npm start`. The Express server will serve both the API and the built React frontend.
