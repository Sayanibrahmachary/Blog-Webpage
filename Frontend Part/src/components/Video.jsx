import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart as faHeartRegular,faComment,faShareFromSquare,faBookmark,faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid,faBlog} from "@fortawesome/free-solid-svg-icons";
import './Video.css';

function Video({item})
{
    const [isLike, setIsLike] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    const toggleLike=()=>
    {
        if(!isLike)
        {
            setIsLike(true);
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 800);
        }
        else
        {
            setIsLike(false);
        }
    }

    console.log(isLike);
    return(<>
        <div className="whole-area-video">
            <div className="video-section">
                <video controls className={`video-part ${isLike ? "liked" : ""}`} >
		        	<source src={item.video} type="video/mp4"/>
		        </video>
                {showHeart && (
                    <div className="big-heart-anim-postsLayout">
                      <FontAwesomeIcon icon={faHeartSolid} className="faHeartBig"/>
                    </div>
                )}
                <div className="like-video" onClick={toggleLike}>
                    {!isLike ? (<FontAwesomeIcon icon={faHeartRegular} size="l" style={{ color: "white" }}/>) : ( <FontAwesomeIcon icon={faHeartSolid} size="l" style={{ color: "#b720ee" }}/>)}
                </div>
                <div className="comment-video">
                    <FontAwesomeIcon icon={faComment} size="l" style={{ color: "white" }} className="like-post-layout"/>
                </div>
                <div className="share-video">
                    <FontAwesomeIcon icon={faShareFromSquare} size="l" style={{ color: "white" }} className="like-post-layout"/>
                </div>
            </div>
        </div>
    </>)
}

export default Video;

// https://pin.it/2x0bordy5