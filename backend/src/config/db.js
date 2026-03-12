import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4']) //forcefully setting node to use google dns to resolve domain to connect mongoDB

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=>{
            console.log("Database connected successfully.")
        })
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error);
        
    }
}