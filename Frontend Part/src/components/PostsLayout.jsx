import { useState,useEffect,useCallback } from "react";
import './PostsLayout.css';
import AllComments from "./AllComments.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart as faHeartRegular,faComment,faShareFromSquare,faBookmark,faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid,faBlog} from "@fortawesome/free-solid-svg-icons";

function PostLayout({post})
{
  const [isLike, setIsLike] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [comments,setComments]=useState([]);

  const toggleLike = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("You are not logged in.");
            return;
          }

          const response = await fetch(
            `http://localhost:8000/api/v1/likes/togglePostLike/${post._id}`,{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const result = await response.json();


          if (response.ok) {
            if (result.message === "disLike successfully") {
              setIsLike(false);
              setShowHeart(true);
              setTimeout(() => setShowHeart(false), 800);
              // alert("dislike successfully");
            } 
            else {
              setIsLike(true);
            }
          } else {
            alert(result.message || "Something went wrong!");
          }
        } catch (e) {
          console.error(e);
          alert("Something went wrong");
        }
  };

  const alreadyLike=async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("You are not logged in.");
            return;
          }

          const response = await fetch(
            `http://localhost:8000/api/v1/likes/alreadyLike/${post._id}`,{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const result = await response.json();

          if (response.ok) {
            if (result.message === "dislike") {
              setIsLike(false);
              // alert("dislike");
            } 
            else {
              setIsLike(true);
              setShowHeart(true);
              setTimeout(() => setShowHeart(false), 800);
              // alert("like");
            }
          } else {
            alert(result.message || "Something went wrong!");
          }
        } catch (e) {
          console.error(e);
          alert("Something went wrong");
        }
  };

  const handleComment=async()=>
    {
       try{
          const token = localStorage.getItem("token");
          if (!token) {
            alert("You are not logged in.");
            return;
          }

          const response=await fetch(`http://localhost:8000/api/v1/posts/allCommentInAPost/${post._id}`,{
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
          })
        
        if (!response.ok) {
          const error = await response.json();
          console.error("Error:", error.message);
          alert(`Fetching all comments: ${error.message}`);
          return;
        }

        const result = await response.json();
        console.log("📦 all comments successfully:", result);
        setComments(result.data);
        setIsOpenComments(true);
        alert("fetched all comments successfully!");
       }
       catch(e)
       {
          console.error(e);
          alert(`An error occurred while fetching all the comments`);
       }
  };

  useEffect(() => {
        alreadyLike();
  }, []);

  return(<>
      <div className="post_layout">
          <div className="upperPart-post-layout">
              <img src={post.owner.avatar}></img>
              <p>{post.owner.username}_blogger_official</p>
              <FontAwesomeIcon icon={faBlog} style={{color: "#a41be4",}} size="l" className="blog-post-layout"/>
          </div>
          {!isOpenComments ? 
            (<div className="middlePart-post-layout">
                <img src={post.photo}/>
                {showHeart && (
                    <div className="big-heart-anim-postsLayout">
                      <FontAwesomeIcon icon={faHeartSolid} className="faHeartBig"/>
                    </div>
                )}
              </div>):
              (<div className="middlePart-post-layout">
                <AllComments comments={comments} setIsOpenComments={setIsOpenComments} productId={post._id}/>
              </div>)
          }
          <div className={`lowerPart-post-layout ${isLike ? "liked" : ""}`} onClick={toggleLike}>
              {!isLike ? (<FontAwesomeIcon icon={faHeartRegular} size="l" />) : ( <FontAwesomeIcon icon={faHeartSolid} size="l" style={{ color: "#b720ee" }}/>)}
              <FontAwesomeIcon icon={faComment} size="l" className="like-post-layout" onClick={handleComment}/>
              <FontAwesomeIcon icon={faShareFromSquare} size="l" className="like-post-layout"/>
              <FontAwesomeIcon icon={faBookmark} size="l" className="save-post-layout"/>
          </div>
      </div>
  </>)
}

export default PostLayout;