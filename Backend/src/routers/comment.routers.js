import {Router} from "express";
import { createComment, deleteComment, updateComment } from "../controllers/comment.controllers.js";

const router=Router();

router.route("/createComment/:postId/:userId").post(createComment);
router.route("/updateComment/:commentId").patch(updateComment)
router.route("/deleteComment/:commentId").delete(deleteComment);

export default router;