import {Router} from "express";
import { toggleFollowers,getAllFollowers,getAllFollowings} from "../controllers/follower.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/toggleFollowers/:userId").post(verifyJWT,toggleFollowers);
router.route("/getAllFollowers/:userId").get(getAllFollowers);
router.route("/getAllFollowings/:userId").get(getAllFollowings);

export default router;