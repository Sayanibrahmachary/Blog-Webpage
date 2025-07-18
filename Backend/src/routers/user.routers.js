import {upload} from '../middlewares/multer.middlerware.js';
import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { loggoutUser,
    loginUser,
    getUser,
    refreshAccessToken, 
    registerUser,
    changeCurrentPassword,allPostByAUser} from "../controllers/user.controllers.js";

const router = Router();
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount:1,
        },
    ]),
    registerUser)

router.route("/login").post(loginUser);
router.route("/getUser").get(verifyJWT,getUser);
//secured rouths
router.route("/logout").post(verifyJWT,loggoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/changePassword").post(verifyJWT,changeCurrentPassword);
router.route("/allPostByAUser/:userId").post(allPostByAUser);

export default router;