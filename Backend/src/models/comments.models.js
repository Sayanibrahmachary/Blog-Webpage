import mongoose,{Schema} from "mongoose";

const commentSchema=new mongoose.Schema
(
    {
        content:
        {
            type: String,
            required:true,
        },
        postId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post",
        },
        commentedBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    },{timestamps:true}
)

export const Comment=mongoose.model("Comment",commentSchema);