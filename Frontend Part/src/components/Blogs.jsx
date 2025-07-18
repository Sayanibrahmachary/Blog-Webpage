import { useCallback ,useState,useEffect} from "react";
import './Blogs.css';
import Video from "./Video";

function Blogs()
{
  const [video,setVideo]=useState([]);

  const getAllVideos = useCallback(async()=>
  {
    try{
      const token = localStorage.getItem("token"); 
  
        if (!token) {
          console.error("No token found. Please log in.");
          alert("You are not logged in.");
          return;
        }
        const response=await fetch(`http://localhost:8000/api/v1/videos/getAllVideos`,{
          method:"GET",
          headers:{
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
        })
        
        const result = await response.json();

        if(response.ok)
        {
          setVideo(result.data);
          alert(`Successfully fetched the videos`);
        }
        else
        {
          alert(result.message || "Something went wrong!");
        }
    }
    catch(e)
    {
      console.error(e);
    }
  })
  useEffect(()=>{
    getAllVideos();
  },[])
  console.log(video);

  return(<>
      <div className="whole-container-blogs">
        <div className="blogs-container">
            {video.map((item,index)=>(
              <Video item={item}></Video>
            ))}
        </div>
      </div>
  </>)
}

export default Blogs;
