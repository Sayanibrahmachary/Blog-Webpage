import mongoose,{isValidObjectId }from 'mongoose';
import {asyncHandler} from  "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js";
import {Video} from "../models/video.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const { ObjectId } = mongoose.Types;

const getAllVideos = asyncHandler(async (req, res) =>
{
    const allVideo=await Video.find().populate('video description') // only select needed fields
      .sort({ createdAt: -1 });
    return res.
    status(200)
    .json(new ApiResponse(200,allVideo,"All posts fetched successfully"));
})

const createVideo = asyncHandler(async (req, res) => {
    const { description } = req.body;

    if (!description || description.trim() === "") {
        throw new ApiError(400, "Description is required");
    }

    const videoLocalPath = req.files?.video?.[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath);

    if (!videoFile || !videoFile.url) {
        throw new ApiError(500, "Video upload to Cloudinary failed");
    }

    const video = await Video.create({
        video: videoFile.url,
        description,
        userId: req.user?._id,
    });

    if (!video) {
        throw new ApiError(500, "Something went wrong while saving the video to the database");
    }

    return res.status(200).json(
        new ApiResponse(200, video, "Video uploaded successfully")
    );
});

const deleteVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params
    if(!isValidObjectId(videoId))
    {
        throw new ApiError(401,"Invalid VideoId")
    }

    const deleteResponce= await Video.deleteOne({
        _id: new ObjectId(videoId),
    });

    if(!deleteResponce.acknowledged)
    {
        throw new ApiError(401,"Error while deteing video from db")
    }

    res
    .status(200)
    .json(new ApiResponse(200,deleteResponce,"Video deleted Successfully"))
    //TODO: delete video
})

export {
    getAllVideos,
    createVideo,
    deleteVideo,
}

