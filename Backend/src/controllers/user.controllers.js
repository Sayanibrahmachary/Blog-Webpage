import {asyncHandler} from  "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  jwt from "jsonwebtoken";    
import { Post } from "../models/post.models.js";
import mongoose, { isValidObjectId } from "mongoose";

const generateAccessAndRefreshTokens = async(userId)=>
    {
        try{
    
            const user= await User.findById(userId);
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            const accessToken=user.generateAccessToken();
            const refreshToken=user.generateRefreshToken();
    
            user.refreshToken=refreshToken;
            await user.save({validateBeforeSave: false});// for saving the refreshtoken in data base or mongooes give you this features to you
    
            return {accessToken,refreshToken};
        }
        catch(error)
        {
    
            throw new ApiError(500,"Something went wrong while generating refresh and access token");
        }
}


const registerUser= asyncHandler(async(req,res)=>
{   
    const {bio,address, email, username, password}=req.body
    //console.log(bio+" "+address+" "+email+" "+username+" "+password);
    
    if(bio=="")
    {
        throw new ApiError(400,"bio is required");
    }
    else if(username=="")
    {
        throw new ApiError(400,"username is required");
    }
    else if(email=="")
    {
        throw new ApiError(400,"email is required");
    }
    else if(password=="")
    {
        throw new ApiError(400,"please give a password which protect your account, it is required");
    }
    else if(!email.includes("@") && !email.includes("$") && !email.includes("#") && !email.includes("&") && !email.includes("*"))
    {
        throw new ApiError(400,"pleace put any special character like @,#,$,&,*");
    }
    else if(address=="")
    {
        throw new ApiError(400,"Adress is required");
    }
    console.log(username+" "+email);
    const exitedUser = await User.findOne ({
        $or: [{username},{email}]
    })
    
    if(exitedUser)
    {
        throw new ApiError(409, "User with email or username is already exits");
    }

    //check for images and check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log("Sayani");

    //if avatar is not present then sent a message
    if(!avatarLocalPath)
    {
        throw new ApiError(400,"Avatar file is required");
    }

    //upload avatar and coverImage in cloudinary
    const avatar=await uploadOnCloudinary(avatarLocalPath);

    //if avatar is not present then sent a message
    if(!avatar)
    {
        throw new ApiError(400, "Avatar is required");
    }

    //user create in MongoDb
    const user=await User.create({
        bio,
        address,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    })

    //remove password and refreshToken from user
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //if user is not created in db then throw an apierror
    if(!createdUser)
    {
        throw new ApiError(500,"Something went wrong while registering the user");
    }

    //if it is successfull run then also send an error
    return res.status(201).json(
        new ApiResponse (200,createdUser,"User registered Successfully")
    )
})


//LOGIN USER......................
const loginUser=asyncHandler(async(req,res)=>
{
    const { username , email , password }=req.body;

    if(!(username|| email))
    {
        throw new ApiError(400,"Username or email is required");
    }

    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if(!user)
    {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid= await user.isPasswordCorrect(password)
    if(!isPasswordValid)
    {
        throw new ApiError(401, "Invalid user credentials");
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

    //send cookies
    const loggedIn=await User.findById(user._id).
    select("-password -refreshToken");

    const options={
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("accessToken", accessToken,options).cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{user: loggedIn, accessToken,refreshToken},"User logged in successfully",))
})


//GET USER.........................
const getUser=asyncHandler(async(req,res)=>
{
    return res.status(200).json(new ApiResponse(200,req.user,"User details fetched",));
})


//LOGOUT USER.....................
const loggoutUser = asyncHandler(async(req,res)=>
    {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 //this removes the field from document
                }
            },
            {
                new: true
            }
        )
        const options={
            httpOnly: true,
            secure: true,
        }
        return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(
            new ApiResponse(200,{},"User Logedout successfully")
        )
        
})

//GENERATE ACCESS AND REFRESH TOKEN................
const refreshAccessToken = asyncHandler(async(req,res)=>
    {
        const incomingRfreshToken=req.cookies.refreshToken || req.body.refreshToken
    
        if(!incomingRfreshToken)
        {
            throw new ApiError(401, "Unauthorized request");
        }
    
        try {
            const decodedToken=jwt.verify(
                incomingRfreshToken, process.env.REFRESH_TOKEN_SECRET,
            )
        
            const user=await User.findById(decodedToken?._id)
            if(!user)
            {
                throw new ApiError(401, "Invalid token");
            }
        
            if(user?.refreshToken!==incomingRfreshToken)
            {
                throw new ApiError(401,"Refresh Token is expired or used");
            }
        
            const options={
                httpOnly:true,
                secure:true,
            }
        
            const {accessToken,newRefreshToken}=await user.generateRefreshToken(user._id)
        
            return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newRefreshToken,options).json(
                200,
                {
                    accessToken,newRefreshToken
                },
                "Access token refreshed successfully",
            )
        } catch (error) {
            throw new ApiError(401,error?.message || "Invalid refresh token")
        }
})

//Change Current Password
const changeCurrentPassword = asyncHandler(async(req,res)=>
    {
        const {oldPassword , newPassword} = req.body
    
        const user=await User.findById(req.user?._id)
        const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
        if(!isPasswordCorrect)
        {
            throw new ApiError(400 , "Invalid old password")
        }
        user.password=newPassword;
        await user.save({validateBeforeSave : false})
    
        return res.
        status(200)
        .json(new ApiResponse(200,user,"Password changed SuccessFull"))
})

const allPostByAUser=asyncHandler(async(req,res)=>
{
    const {userId}=req.params;

    const allPost=await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(userId)
            },
        },
        {
            $lookup:
            {
                from:"posts",
                localField:"_id",
                foreignField:"owner",
                as:"allPosts"
            }
        },
        {
            $unwind:"$allPosts"
        },
        {
            $project:
            {
                postId:"$allPosts._id",
                description:"$allPosts.description",
                tag:"$allPosts.tag",
                photo:"$allPosts.photo",
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200,allPost,"All post fetched successfully"));
})


export {
    registerUser,
    loginUser,
    getUser,
    loggoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    allPostByAUser,
}