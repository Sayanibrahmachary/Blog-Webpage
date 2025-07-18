import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema (
    {
        video:
        {
            type: String,
            required: true,
        },
        description:
        {
            type: String,
            required: true,
        },
        userId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },{timestamps:true}
);

videoSchema.plugin(mongooseAggregatePaginate)
export const Video= mongoose.model("Video",videoSchema);
