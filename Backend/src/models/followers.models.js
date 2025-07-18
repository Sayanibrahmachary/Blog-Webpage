import mongoose, { model, Schema } from "mongoose";


const followerSchema=new mongoose.Schema(
    {
        follower:
        {
            type: mongoose.Schema.Types.ObjectId,//one who is follow
            ref:"User",
        },
        following:
        {
            type: mongoose.Schema.Types.ObjectId,//one whom i follow
            ref:"User",
        }
    }
)

export const Followers=mongoose.model("Followers",followerSchema)