import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comments.models.js";
import { isValidObjectId } from "mongoose";

const createComment=asyncHandler(async(req,res)=>
{
    const {content}=req.body;
    const {postId,userId}=req.params;

    if(content=="")
    {
        throw new ApiError(400,"Content is requried");
    }
    if(!isValidObjectId(postId))
    {
        throw new ApiError(400, "Invalid postId")
    }
    if(!isValidObjectId(userId))
    {
        throw new ApiError(400, "Invalid userId")
    }

    const comment=await Comment.create({
        content,
        postId:postId,
        commentedBy:userId,
    })

    if(!comment)
    {
        throw new ApiError(400,"Comment is not created");
    }

    return res
    .status(200)
    .json(new ApiResponse(200,comment,"Comment is created successfully"));
})

const updateComment=asyncHandler(async(req,res)=>
{
    const {commentId} = req.params
    const {content}=req.body
    //console.log(content);

    if(content=="")
    {
        throw new ApiError(400,"Content is required for updation")
    }
    if(!isValidObjectId(commentId))
    {
        throw new ApiError(400, "Invalid CommentId")
    }

    const commentUpdate= await Comment.findByIdAndUpdate(
        commentId,
        {
            $set:
            {
                content: content
            }
        }
    )

    if(!commentUpdate)
    {
        throw new ApiError(400,"comment is not update")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,commentUpdate,"comment is update successfully"))
})

const deleteComment=asyncHandler(async(req,res)=>
{
    const {commentId}=req.params;

    if(!isValidObjectId(commentId))
    {
        throw new ApiError(400,"CommentId is invalid");
    }

    const deleteComment=await Comment.findByIdAndDelete(commentId);

    if(!deleteComment)
    {
        throw new ApiError(400,"comment is not deleted successfully");
    }

    return res
    .status(200)
    .json(new ApiResponse(200,deleteComment,"comment is deleted successfully"));
}) 


export{
    createComment,
    updateComment,
    deleteComment
}