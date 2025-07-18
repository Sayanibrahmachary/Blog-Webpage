import { Router } from 'express';
import {
    getAllVideos,
    createVideo,
    deleteVideo,
} from "../controllers/video.controllers.js"
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {upload} from '../middlewares/multer.middlerware.js';

const router = Router();
router.use(verifyJWT); //Apply verifyJWT middleware to all routes in this file //.get(getAllVideos)

router.route("/createVideo").post(
    upload.fields([
        {
            name: "video",
            maxCount: 1,
        },
    ]),
createVideo);

router.route("/deleteVideo/:videoId").delete(deleteVideo);
router.route("/getAllVideos").get(getAllVideos);

export default router
