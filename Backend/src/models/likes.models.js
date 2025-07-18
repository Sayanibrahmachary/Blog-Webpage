import mongoose from "mongoose";

const likeSchema=new mongoose.Schema
(
    {
        postId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post",
        },
        commentLike:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
        },
        likedBy:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    },{timestamps:true}
)

export const Like=new mongoose.model("Like",likeSchema);