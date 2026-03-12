import express from 'express';
import 'dotenv/config'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import { app, server } from './lib/socket.js';

const PORT = process.env.PORT || 5001;
const __dirname = path.dirname(fileURLToPath(import.meta.url))



await connectDB()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json({ limit: '5mb' }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/dist')))

    app.get('/{*splat}', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
    })
}

server.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
})