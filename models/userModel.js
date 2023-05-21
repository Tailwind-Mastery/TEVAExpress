import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    hashed: {
        type: String,
    },
}, {
    timestamps: true
}) 

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.hashed = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(enteredPassword) {

    if(( await bcrypt.compare(enteredPassword, this.hashed)) && this.password == enteredPassword) {return true;} else {return false;}
}

const User = mongoose.model('User', userSchema)
export default User;