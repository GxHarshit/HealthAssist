import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        min: [6, 'Too short, min is 6 characters'],
        max: [50, 'Too long, max is 55 characters'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select : false
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
        
    }
});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const User = mongoose.model('user', userSchema);

export default User;