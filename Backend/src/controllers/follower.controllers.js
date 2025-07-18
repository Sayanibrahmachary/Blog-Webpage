import mongoose,{isValidObjectId} from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Followers } from "../models/followers.models.js";


const toggleFollowers=asyncHandler(async(req,res)=>
{
    const {userId}=req.params;

    if(!isValidObjectId(userId))
    {
        throw new ApiError(401,"Invalid userId")
    }

    const follower = await Followers.findOne(
        {
            follower: req.user?._id,
            following: userId,
        }
    )
    
    if(!follower)
    {
        //console.log(req.user?._id);
        const followerDone=await Followers.create({
            follower: req.user?._id,
            following: userId,
        })

        return res
        .status(200)
        .json(new ApiResponse(200,followerDone,"follow successfully"))
    }

    else
    {
        const unFollow=await Followers.findByIdAndDelete(follower?._id)
        return res
        .status(200)
        .json(new ApiResponse(200,unFollow,"UnFollow successfully"))
    }
})


const getAllFollowers=asyncHandler(async(req,res)=>
{
    const {userId}=req.params;

    if(!isValidObjectId(userId))
    {
        throw new ApiError(400,"Invalid userId from follower");
    }

    const follower=await Followers.aggregate([
        {
            $match:{
                following:new mongoose.Types.ObjectId(userId),
            }
        },
        {
            $lookup:
            {
                from:"users",
                localField:"follower",
                foreignField:"_id",
                as:"allFollowers",
            }
        },
        {
            $unwind:"$allFollowers",
        },
        {
            $project:
            {
                username:"$allFollowers.username",
                avatar:"$allFollowers.avatar",
            }
        },
        
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,follower,{total:follower.length},"All followers fetched successfully"));
})


const getAllFollowings=asyncHandler(async(req,res)=>
{
    const {userId}=req.params;

    if(!isValidObjectId(userId))
    {
        throw new ApiError(400,"Invalid UserId");
    }

    const following =await Followers.aggregate([
        {
            $match:
            {
                follower:new mongoose.Types.ObjectId(userId),
            }
        },
        {
            $lookup:
            {
                from:"users",
                localField:"following",
                foreignField:"_id",
                as:"allFollowing"
            }
        },
        {
            $addFields:
            {
                totalFollowers:
                {
                    $size:"$allFollowing"
                },
            }
        },
        {
            $unwind:"$allFollowing",
        },
        {
            $project:
            {
                username:"$allFollowing.username",
                avatar:"$allFollowing.avatar",
                totalFollowers:1,
            }
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse (200,following,{total:following.length},"All Followings are fetched successfully"));
})


export {
    toggleFollowers,
    getAllFollowers,
    getAllFollowings,
}
