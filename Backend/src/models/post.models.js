import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    
        description:
        {
            type:String,
            required:true,
        },
        photo:
        {
            type:String,
            required:true,
        },
        tag:
        {
            type:String,
            required:true,
        },
        commentId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"comment",
        },
        owner:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },{timestamps:true}
)

export const Post=mongoose.model("Post",postSchema);