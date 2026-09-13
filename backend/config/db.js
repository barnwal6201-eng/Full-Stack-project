import mongoose from "mongoose";
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB CONNECTED'))
}