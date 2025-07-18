import React, { useEffect, useState } from "react";
import './AllComments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes ,faPen,faTrash} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

function AllComments({ comments ,setIsOpenComments, productId}) {

  const user = useSelector((state) => state.user.users);
  const currUser = user?.[0]?.data;
 //console.log(currUser._id);
  const [msg, setMsg] = useState("");
  const [message, setMessage] = useState("");
  const [msgseen, setMsgseen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate=async()=>
  {
    setMsg(message);       // Put message back in input
    setIsEditing(true);  
  }
  
  const handleMsg=async()=> {
    if (isEditing) {
      // Update mode
      setMessage(msg);
      setIsEditing(false);
      setMsg("");
      const data={
        description:msg,
      }
  
      const commentId=localStorage.getItem("commentId");

      try
      {
        const token = localStorage.getItem("token");
        //console.log(token);
        
        if (!token) {
            console.error("No token found. Please log in.");
            alert("You are not logged in.");
            return;
        }
        const response=await fetch(`http://localhost:8000/api/v1/comments/updateComment/${commentId}`,{
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })
        console.log(response);

        if (!response.ok) {
          const error = await response.json();
          console.error("Error:", error.message);
          alert(error.message);
        }
        else{
          const result = await response.json();
          console.log("Comment placed successfully", result);
          alert("Comment placed successfully");
        }
      }
      catch(e)
      {
        console.log("Error occur in the time of push the comment in database");
        alert(`Error occur in the time of push the comment in database`);
      }

    } 
    else {
      // Add mode
      setMessage(msg);
      setMsgseen(true);
      setMsg("");
      const data={
        content:msg,
      }

      try
      {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
            console.error("No token found. Please log in.");
            alert("You are not logged in.");
            return;
        }
        const response=await fetch(`http://localhost:8000/api/v1/comments/createComment/${productId}/${currUser._id}`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
		  		const error = await response.json();
		  		console.error("Error:", error.message);
		  		alert(error.message);
		  	}
		  	else{
		  		const result = await response.json();
		  		console.log("Comment placed successfully", result);
                localStorage.setItem("commentId",result.data._id);
		  		alert("Comment placed successfully");
		  	}
      }
      catch(e)
      {
        console.log("Error occur in the time of push the comment in database");
        alert(`Error occur in the time of push the comment in database`);
      }
    }
  }

  const handleDelete=async()=>
  {
    setMessage("");
    setMsgseen(false);
    setMsg("");
    setIsEditing(false);

    const commentId=localStorage.getItem("commentId");

    try
    {
      const token = localStorage.getItem("token");
      
      if (!token) {
          console.error("No token found. Please log in.");
          alert("You are not logged in.");
          return;
      }
      const response=await fetch(`http://localhost:8000/api/v1/comments/deleteComment/${commentId}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
      })
      if (!response.ok) {
				const error = await response.json();
				console.error("Error:", error.message);
				alert(error.message);
			}
			else{
				const result = await response.json();
				console.log("Comment deleted successfully", result);
				alert("Comment deleted successfully");
			}
    }
    catch(e)
    {
      console.log("Error occur in the time of delete the comment in database");
      alert(`Error occur in the time of delete the comment in database`);
    }
  }

  function handleVisible() {
    setVisible(!visible);
    setIsOpenComments(!visible);
  }

  useEffect(() => {
    handleVisible();
  }, []);

  return (
    <>
        {visible && (
             <div className="comments-overlay">
                <div className="msg-div">
                    <div className="msg">
                      <div className="all-msg">
                        <button className="close-btn1" onClick={handleVisible}>
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                        {comments.length > 0 ? (
                          comments.map((item, index) => (
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
                          ))

                        ) : (
                          <p>Loading...</p>
                        )}

                        <div className="my-msg1">
                          {msgseen && 
                            <div className="my-msg-div">
                              <p>{message}</p>
                              <FontAwesomeIcon icon={faPen} className="iconUpdate" onClick={handleUpdate}/>
                              <FontAwesomeIcon icon={faTrash} className="iconDelete" onClick={handleDelete}/>
                            </div> 
                          }  
                        </div>
                        <div className="my-msg">
                          <div className="my-msg-input">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              value={msg}
                              onChange={(e) => setMsg(e.target.value)}
                            />
                            <div className="send-icon">
                              <button onClick={handleMsg}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        )}
    </>
  );
}

export default AllComments;
