import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type } from "os";

const userSchema=new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true,
            lowercase:true,
            trim:true,
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim: true,
        },
        address:
        {
            type:String,
            required:true,
        },
        bio:
        {
            type:String,
            required:true,
            trim:true,
        },
        avatar:
        {
            type:String,
            required:true,
        },
        password:
        {
            type: String,
            required: [true,"password is required"],
        },
        post:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Post"
            }
        ],
        refreshToken:
        {
            type: String,
        }
    },{timestamps:true}
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken= function () {
    return jwt.sign
    (
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        
    )
}

userSchema.methods.generateRefreshToken= function () {
    return jwt.sign
    (
        {
            _id: this._id,
        },

        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema);