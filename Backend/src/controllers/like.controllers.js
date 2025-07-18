import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import {Like} from "../models/likes.models.js";

const togglePostLike=asyncHandler(async(req,res)=>
{
    const {postId}=req.params;

    if(!isValidObjectId(postId))
    {
        throw new ApiError(400,"Invalid PostId");
    }

    const like=await Like.findOne({
        likedBy: req.user?._id,
        postId:postId,
    })

    if(!like)
    {
        const likeDone= await Like.create({
            postId:postId,
            likedBy:req.user?._id
        })

        return res
        .status(200)
        .json(new ApiResponse(200,likeDone,"like  successfull"))
    }
    else
    {
        const disLike=await Like.findByIdAndDelete(like?._id)
        return  res
        .status(200)
        .json(new ApiResponse(200,disLike,"disLike successfully"))
    }
})

const alreadyLike=asyncHandler(async(req,res)=>
{
    const {postId}=req.params;

    if(!isValidObjectId(postId))
    {
        throw new ApiError(404,"PostId is isValid");
    }

    const like=await Like.findOne({
        likedBy: req.user?._id,
        postId:postId,
    })

    if(!like)
    {
        return res.status(200).json(new ApiResponse(200,like,"dislike"));
    }
    return res.status(200).json(new ApiResponse(200,like,"like"));

})

const toggleCommentLike=asyncHandler(async(req,res)=>
{
    const {commentId}=req.params;

    if(!isValidObjectId(commentId))
    {
        throw new ApiError(400,"Invalid CommentId");
    }

    const like=await Like.findOne({
        likedBy: req.user?._id,
        commentLike:commentId,
    })

    if(!like)
    {
        const likeDone= await Like.create({
            commentLike:commentId,
            likedBy:req.user?._id
        })

        return res
        .status(200)
        .json(new ApiResponse(200,likeDone,"like  successfull"))
    }
    else
    {
        const disLike=await Like.findByIdAndDelete(like?._id)
       return  res
        .status(200)
        .json(new ApiResponse(200,disLike,"disLike successfully"))
    }
})

export {
    togglePostLike,
    toggleCommentLike,
    alreadyLike,
}
