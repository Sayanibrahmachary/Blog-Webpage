import { useCallback ,useState,useEffect} from "react";
import PostsLayout from "./PostsLayout.jsx";
import './AllPosts.css';
import { useDispatch } from "react-redux";
import { addUser,setFollowers,setFollowing } from '../features/profilesData/userSlice';

function AllPosts() {

    const [allPosts,setAllPosts]=useState([]);
    const dispatch=useDispatch();

    const allposts = useCallback(async()=>
    {
        try
        {
            const token=localStorage.getItem("token");

            if(!token)
            {
                console.error("No token found. Please log in.");
                alert("You are not logged in.");
                return;
            }
            const response=await fetch(`http://localhost:8000/api/v1/posts/allPosts`,{
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
                setAllPosts(result.data);
                // alert("all posts fetched successfully!");
            }
            else
            {
                alert(result.message || "Something went wrong!");
            }
        }
        catch(e)
        {
            alert(e);
        }
    });

    const handleProfileOpen = useCallback(async()=>
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
          // alert("Handle profile open successfully!");
          // console.log(result);
          dispatch(addUser(result));
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

    useEffect(()=>{
        handleProfileOpen();
        allposts();
    },[])

    // console.log(allPosts);
    return (<>
        <div className="whole-container">
          <div className="posts-container">
            {allPosts.map((post) => (
                <PostsLayout post={post}/>
            ))}
          </div>
        </div>
    </>)   
}

export default AllPosts;