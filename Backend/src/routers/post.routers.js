import {upload} from '../middlewares/multer.middlerware.js';
import { Router } from "express";
import {createPost, updatePost,deletePost,allCommentInAPost, allPosts,postsBasedOnTags} from "../controllers/post.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT);

router.route("/createPost").post(
upload.fields([
    {
        name: "photo",
        maxCount:1,
    },
]),
createPost);

router.route("/updatePost/:postId").patch(updatePost);
router.route("/deletePost/:postId").delete(deletePost);
router.route("/allCommentInAPost/:postId").post(allCommentInAPost);
router.route("/allPosts").get(allPosts);
router.route("/postsBasedOnTags").post(postsBasedOnTags);
export default router;