import {mongoose, isValidObjectId } from "mongoose";
import { Post } from "../models/post.models.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
const { ObjectId } = mongoose.Types;

const createPost=asyncHandler(async(req,res)=>
{
    const {description,tag}=req.body;
    //console.log(description+" "+tag);
    
    if(description=="")
    {
        throw new ApiError(404,"Description is required");
    }
    if(tag=="")
    {
        throw new ApiError(404,"Tag is required");
    }

    const photoLocalPath=req.files?.photo[0]?.path;
    //console.log(photoLocalPath);

    if(!photoLocalPath)
    {
        throw new ApiError(400,"Photo file is required");
    }

    const photo=await uploadOnCloudinary(photoLocalPath);

    if(!photo)
    {
        throw new ApiError(400,"Photo is required");
    }
    //console.log(req.user?._id);

    const post=await Post.create(
    {
        description:description,
        tag:tag,
        photo:photo.url,
        owner: req.user?._id
    })

    //console.log(post);
    const savedProduct= await post.save();
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }      

    user.post = user.post || [];
    user.post.push(post);
    await user.save();

    //console.log(post);
    if(!post)
    {
        throw new ApiError(400,"post is not created");
    }

    return res.status(200).json(new ApiResponse(200,post,"The post is uploaded successfully"));
})


const updatePost=asyncHandler(async(req,res)=>
{
    const {description,tag}=req.body;
    const {postId}=req.params;

    if(description=="")
    {
        throw new ApiError(404,"Description is required");
    }
    if(tag=="")
    {
        throw new ApiError(404,"tag is required");
    }

    // console.log(description);
    // console.log(tag);
    if(!isValidObjectId(postId))
    {
        throw new ApiError(404,"Post Id is not valid");
    }

    //console.log("Sayani");
    const post=await Post.findByIdAndUpdate(
        postId,
        {
            $set:
            {
                description,
                tag,
            }
        },
        {
            new:true,
        }
    )

    return res.status(200).json(new ApiResponse(200,post,"Post is updated successfully"));
})


const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Post Id is wrong");
    }

    // Find and delete the post
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    // Find the user
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Safely remove the postId from user's posts
    user.post = user.post.filter(p => p && p.toString() !== postId);
    await user.save();

    return res.status(200).json(new ApiResponse(200, post, "Post is deleted successfully"));
});


const allCommentInAPost=asyncHandler(async(req,res)=>
{
    const {postId}=req.params;
    //console.log(postId);

    if(!isValidObjectId(postId))
    {
        throw new ApiError(400,"Invalid PostId");
    }

    const allComments=await Post.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(postId)
            }
        },
        {
            $lookup:
            {
                from:"comments",
                localField:"_id",
                foreignField:"postId",
                as:"allComments",
                pipeline:
                [
                    {
                        $lookup:
                        {
                            from:"users",
                            localField:"commentedBy",
                            foreignField:"_id",
                            as:"customerDetails",
                        }
                    },
                    {
                        $unwind:"$customerDetails"
                    }
                ]
            }
        },
        {
            $unwind:"$allComments",
        },
        {
            $project:
            {
                username:"$allComments.customerDetails.username",
                avatar:"$allComments.customerDetails.avatar",
                content:"$allComments.content",
                commentedBy:"$allComments.commentedBy",
            }
        }

    ])

    return res.status(200)
    .json(new ApiResponse(200,allComments,"All comments fetched successfully"));
})


const allPosts=asyncHandler(async(req,res)=>
{
    const allPost=await Post.find().populate('owner', 'username avatar') // only select needed fields
      .sort({ createdAt: -1 });
    return res.
    status(200)
    .json(new ApiResponse(200,allPost,"All posts fetched successfully"));
})

const postsBasedOnTags=asyncHandler(async(req,res)=>
{
    const {tags}=req.body;
    console.log(tags);
    if(!tags)
    {
        throw new ApiError("tag is required");
    }

    const posts= await Post.find({tag:{$in:tags}});

    //console.log(posts);

    res.status(200).json(new ApiResponse(200,posts,"Fetched all the posts successfully"));
})


export {
    createPost,
    updatePost,
    deletePost,
    allCommentInAPost,
    allPosts,
    postsBasedOnTags,
}