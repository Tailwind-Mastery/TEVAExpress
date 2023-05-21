import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
}) 

const Token = mongoose.model('Token', tokenSchema)
export default Token;