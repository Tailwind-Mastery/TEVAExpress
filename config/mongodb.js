import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo db connected'+conn.connection.host);
    } catch (error) {
        throw new Error(error);
    }
}
export default connectDB;