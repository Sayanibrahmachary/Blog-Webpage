import "./OpenPhoto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart as faHeartRegular,faComment,faShareFromSquare} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function OpenPhoto({ closePopupOpenPhoto, itemsDetails }) {

  //console.log(itemsDetails);
  const user = useSelector((state) => state.user.users);
  // console.log(user);
  const [isLike, setIsLike] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [comment,setComment]=useState([]);

  
  const toggleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/likes/togglePostLike/${itemsDetails.postId}`,{
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
          // alert("dislike successfully");
        } 
        else {
          setIsLike(true);
          setShowHeart(true);
          setTimeout(() => setShowHeart(false), 800);
          // alert("like successfully");
        }
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    }
  };

  const alreadyLike=async () =>{
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/likes/alreadyLike/${itemsDetails.postId}`,{
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

  const handleComment=async () =>
  {
      try
      {
        const token=localStorage.getItem("token");
        
        if (!token) {
          alert("You are not logged in.");
          return;
        }

        const response=await fetch(`http://localhost:8000/api/v1/posts/allCommentInAPost/${itemsDetails.postId}`,{
          method:"Post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        
        const result= await response.json();
        console.log(result);
        if(response.ok)
        {
          alert("fetched all comments successfully");
          setComment(result.data);
          console.log(result.data);
        }
        else
        {
          alert(result.message || "Something went wrong!");
        }
      }
      catch(e)
      {
        alert("something went wrong");
      }
  };

  useEffect(() => {
    alreadyLike()
  }, []);

  return (
    <div className="amount-container-openPhoto">
      <div className="popup-openPhoto">
        <div className="leftSide-OpenPhoto">
          <div className="image-section-OpenPhoto">
            <img src={itemsDetails.photo} alt="Post" />
            {showHeart && (
              <div className="big-heart-anim">
                <FontAwesomeIcon icon={faHeartSolid} className="faHeartBig" />
              </div>
            )}
          </div>

          <div className="lower-section-OpenPhoto">
            <div className="likes-OpenPhoto">
              <div className={`isLike-OpenPhoto ${isLike ? "liked" : ""}`} onClick={toggleLike}>
                {!isLike ? (<FontAwesomeIcon icon={faHeartRegular} size="xl" />) : ( <FontAwesomeIcon icon={faHeartSolid} size="xl" style={{ color: "#b720ee"}}/>)}
              </div>
              <div className="clickComment" onClick={handleComment}>
                <FontAwesomeIcon icon={faComment} size="xl" className="comment-OpenPhoto" />
              </div>
              <FontAwesomeIcon icon={faShareFromSquare} size="xl" className="like-OpenPhoto" />
              <div className="tag-OpenPhoto">
                <p>[{itemsDetails.tag}]</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide-OpenPhoto">
          {/* Add right section content here */}
          <div className="craption-section">
              <div className="craption-section-openPhoto">
                <div className="profilePic-profile-openPhoto">
                  <div className="circle-profile-openPhoto">
                      <div class="profileImage-user-profile-openPhoto">
                          <img src={user[0].data.avatar}/>
                      </div>
                  </div>
                  <h2>{user[0].data.username}</h2>
                  <p>"{itemsDetails.description} is not just a city it is emotion"</p>
                  <h1>...</h1>
                </div>
              </div>
              <div className="gap"></div>
              <div className="whole-comment-section">
                {comment.map((item, index) => (
                  <div className="profilePic-profile-openPhoto-comment">
                    <div className="circle-profile-openPhoto-comment">
                        <div class="profileImage-user-profile-openPhoto-comment">
                            <img src={item.avatar}/>
                        </div>
                    </div>
                    <div className="user-comment">
                      <div className="user-comment-openPhoto">
                        <h4>{item.username}</h4>
                        <p>{item.content}</p>
                      </div>
                      <div className="user-date-openPhoto">
                        <h5>1d</h5>
                        <h5>1 like</h5>
                        <h5>Reply</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default OpenPhoto;
