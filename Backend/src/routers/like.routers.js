import Router from "express";
import { togglePostLike,toggleCommentLike, alreadyLike } from "../controllers/like.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router=Router();
router.use(verifyJWT);

router.route("/togglePostLike/:postId").post(togglePostLike);
router.route("/alreadyLike/:postId").get(alreadyLike);
router.route("/toggleCommentLike/:commentId").post(toggleCommentLike);

export default router;

