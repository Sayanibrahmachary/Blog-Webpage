import { useCallback,useEffect,useState } from "react";
import './profile.css';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAnglesRight,faImage,faVideo} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";
import Logout from "./Logout";
import CreatePost from "./CreatePost";
import { useDispatch } from "react-redux";
import { addUser,setFollowers,setFollowing } from '../features/profilesData/userSlice';
import OpenPhoto from "./OpenPhoto.jsx";

function Profile()
{
    const [details,setDetails]=useState("");
    const dispatch = useDispatch();
    const [allPosts,setAllPosts]=useState([]);

    const handleProfileOpen=useCallback(async(e)=>
    {
        try
        {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
     
            if (!token) {
                console.error("No token found. Please log in.");
                alert("You are not logged in.");
                return;
            }
            const response=await fetch(`http://localhost:8000/api/v1/users/getUser`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
    
            const result = await response.json();
            if(response.ok)
            {
                alert("user profile open successfully!");
                dispatch(addUser(result));
                setDetails(result.data);
            }
            else
            {
                alert(result.message || "Something went wrong!");
            }
        }
        catch(e)
        {
            console.error(e);
            alert("Something went wrong!");
        }
    });

    const totalFollower=useCallback(async(e)=>
    {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const userId= localStorage.getItem("userId");

            if (!token) {
                console.error("No token found. Please log in.");
                alert("You are not logged in.");
                return;
            }
            const response=await fetch(`http://localhost:8000/api/v1/followers/getAllFollowers/${userId}`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const result = await response.json();
            //console.log(result);

            if(response.ok)
            {
                const count = Array.isArray(result) ? result.length : 0;
                console.log(`Total followers: ${count}`);
                dispatch(setFollowers(count));
                // alert("followers fetched successfully!");
            }
            else
            {
                alert(result.message || "Something went wrong!");
            }
        } catch (error) {
            console.error(error);
        }
    });

    const totalFollowing=useCallback(async(e)=>
    {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const userId= localStorage.getItem("userId");

            if (!token) {
                console.error("No token found. Please log in.");
                alert("You are not logged in.");
                return;
            }
            const response=await fetch(`http://localhost:8000/api/v1/followers/getAllFollowings/${userId}`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const result = await response.json();
            //console.log(result);

            if(response.ok)
            {
                const count = Array.isArray(result) ? result.length : 0;
                console.log(`Total followers: ${count}`);
                dispatch(setFollowing(count));
                // alert("followings fetched successfully!");
            }
            else
            {
                alert(result.message || "Something went wrong!");
            }
        } catch (error) {
            console.error(error);
        }
    });

    const allPostByAUser=useCallback(async(e)=>
    {
        try
        {
            const token = localStorage.getItem("token");
            const userId=localStorage.getItem("userId");
     
            if (!token) {
                console.error("No token found. Please log in.");
                alert("You are not logged in.");
                return;
            }
            const response=await fetch(`http://localhost:8000/api/v1/users/allPostByAUser/${userId}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
    
            const result = await response.json();
            if(response.ok)
            {
                alert("user posts fetched successfully!");
                //console.log(result);
                setAllPosts(result.data);
                //console.log(allPosts);
            }
            else
            {
                alert(result.message || "Something went wrong!");
            }
        }
        catch(e)
        {
            console.error(e);
            alert("Something went wrong!");
        }
    })


    useEffect(()=>{
        handleProfileOpen();
        totalFollower();
        totalFollowing();
        allPostByAUser();
    },[])

    const user = useSelector((state) => state.user.users);
    const getAllFollowers = useSelector((state) => state.user.getFollower);
    const getAllFollowings = useSelector((state) => state.user.getFollowing);
    const [isOpen,setIsOpen]=useState(false);
    const [isOpenLogout,setIsOpenLogout]=useState(false);
    const [isOpenCreatePost,setIsOpenCreatePost]=useState(false);
    const [isClick,setIsClick]=useState(false);
    const [img,setImg]=useState("");
    const [singlePhotoDetails,setSinglePhotoDetails]=useState();

    //console.log(getAllFollowings.message.total);

    //password change functions
    function handleChangePassword()
    {
      setIsOpen(true);
    }

    function closePopup(event) 
    {
      event.stopPropagation();
      setIsOpen(false);
    }


    //logout functions
    function handleLogout()
    {
      setIsOpenLogout(true);
    }

    function closePopUpLogout(event) 
    {
      event.stopPropagation();
      setIsOpenLogout(false);
    }


    //CreatePost Functions
    function createPost()
    {
      setIsOpenCreatePost(true);
    }

    function closePopUpCreatePost(event) 
    {
      event.stopPropagation();
      setIsOpenCreatePost(false);
    } 

    function openPhoto(posts) {
        setSinglePhotoDetails(posts);
        //console.log(singlePhotoDetails);
        setIsClick(true);
    }

    function closePopupOpenPhoto(event)
    {
        event.stopPropagation();
        setIsClick(false);
    }


    //click the photo

    const currentUser = user?.[0]?.data;
    // console.log(currUser);
    if (!currentUser) {
        return <div className="loading">Loading Profile...</div>;
    }

    return(<>
        <div className="whole-profile">
            <div className="center-profile">
                <div className="left-profile">
                    <div className="profilePic-profile">
                        <div className="circle-profile">
                            <div class="profileImage-user-profile">
                                <img src={user[0].data.avatar}/>
                            </div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="name-profile">
                            <h3>{user[0].data.username} ✨</h3>
                        </div>
                        <div className="bio">
                            {/* <p>Bolo Radha Radha❣️🙏</p>
                            <p>#Blue lover💙💙💙</p>
                            <p>I believe in karma😊😊</p> */}

                            <p>{user[0].data.bio} 💙😊💙</p>
                            {/* <p>I believe in karma😊😊</p> */}
                            <p>#Blue lover💙💙💙</p>
                        </div>
                        <div className="lowerPart-details-profile">
                            <div className="changePassword" onClick={handleChangePassword}>
                                <FontAwesomeIcon icon={faAnglesRight} className="arrow-style"/>
                                <p>Change Passoword</p>
                            </div>
                            <div className="changePassword" onClick={createPost}>
                                <FontAwesomeIcon icon={faAnglesRight} className="arrow-style"/>
                                <p>Create post</p>
                            </div>
                            <div className="changePassword">
                                <FontAwesomeIcon icon={faAnglesRight} className="arrow-style"/>
                                <p>Setting</p>
                            </div>
                            <div className="changePassword" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faAnglesRight} className="arrow-style"/>
                                <p>Log out</p>
                            </div>
                            <div className="editButton">
                                <button>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-profile">
                    <div className="upper-profile">
                        <h2>{user[0].data.username} 💙✨</h2>
                        <div className="followers-profile">
                            <table id="customers">
                                <tr>
                                    <th>Posts</th>
                                    <th>Followers</th>
                                    <th>Following</th>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td className="sec">{getAllFollowers}</td>
                                    <td className="sec">{getAllFollowings}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="lower-profile">
                        <div className="photosOrVideos">
                            <div className="photos">
                                <FontAwesomeIcon icon={faImage} style={{color: "#010813",}} className="photosIcon"/>
                                <NavLink to="" className="photos">Photos</NavLink>
                            </div>
                            <div className="videos">
                                <FontAwesomeIcon icon={faVideo} style={{color: "#050b15",}} className="photosIcon"/>
                                <NavLink to="" className="videos">Videos</NavLink>
                            </div>
                        </div>
                        <div className="wholePhotos-part">
                            <div className="photos-part">
                                {/* {user[0].data.post.reduce((rows, item, index) => {

                                    if (index % 2 === 0) {
                                      rows.push([item]);
                                    } 
                                    else {
                                      rows[rows.length - 1].push(item);
                                    }
                                    return rows;
                                    }, []).map((pair, rowIndex) => (
                                    <div className="firstRow" key={rowIndex}>
                                      {pair.map((img, imgIndex) => (
                                        <img src={img} alt={`Post ${rowIndex}-${imgIndex}`} key={imgIndex} />
                                      ))}
                                    </div>
                                ))} */}

                                {allPosts.map((item, index) => (
                                    <img src={item.photo} alt={`Post ${index}`} key={item.id} onClick={()=>{setImg(item.photo),openPhoto(item);}} />
                                ))}

                                {/* {user[0].data.post.map((img, index) => (
                                    <div className="img-wrapper" key={index}>
                                      <img src={img} alt={`Post ${index}`} />
                                    </div>
                                ))} */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {isClick && (
            <div className="overlay" onClick={closePopupOpenPhoto}>
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <OpenPhoto closePopupOpenPhoto={closePopupOpenPhoto} itemsDetails={singlePhotoDetails}/>
                </div>
            </div>
        )}

        {/* Password change*/}
        {isOpen && (
            <div className="overlay" onClick={closePopup}>
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <ChangePassword closePopup={closePopup}/>
                </div>
            </div>
        )}

        {/* Logout */}
        {isOpenLogout && (
            <div className="overlay" onClick={closePopUpLogout}>
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <Logout closePopUpLogout={closePopUpLogout}/>
                </div>
            </div>
        )}

        {/* CreatePosts */}
        {isOpenCreatePost && (
            <div className="overlay" onClick={closePopUpLogout}>
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <CreatePost closePopUpCreatePost={closePopUpCreatePost}/>
                </div>
            </div>
        )}
    </>)
} 
export default Profile;