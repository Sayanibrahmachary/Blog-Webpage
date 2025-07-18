import { useState } from "react";
import "./CreatePost.css";

function CreatePost({closePopUpCreatePost})
{
    const [files, setFiles] = useState(null);
    const [description,setDescription]=useState(null);
    const [tag,setTag]=useState(null);

    const handleFileChange = (event) => {
        setFiles(event.target.files[0]); // Save only the first file
    };

    const handleCreatePosts=async(e)=>
    {
        const formData = new FormData();
        formData.append("description", description);
        formData.append("tag", tag);
        formData.append("photo", files);

        try
        {
            const token=localStorage.getItem("token");

            if(!token)
            {
                console.error("No token found. Please log in.");
                alert("You are not logged in.");
                return;
            }

            const response=await fetch(`http://localhost:8000/api/v1/posts/createPost`,{
                method:"POST",
                credentials: "include",
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
                body:formData,
            });
            //console.log(response);

            const result = await response.json();
            if (response.ok) {
                alert("Post created successfully!");
            } else {
                alert(result.message || "Something went wrong while uploading a post!");
            }
        }catch (e) {
            console.error("Error:", e);
            alert("Something went wrong while uploading a post!");
        }
    }

    return (<>
        <div className="amount-container">
            <div className="popup">
                <h2>CreatePosts</h2>
                <div className="selectAmount">
                    <div className="image-CreatePosts">
                        <label className="upload-box">
                            {files?<p className="photoName"  style={{ color: files ? 'green' : 'black' }}>{files.name}</p>:<p>Click to Upload Post</p>}
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    <textarea className="description" maxlength="150" placeholder="Write description....." onChange={(e)=>setDescription(e.target.value)}/>
                    <input types="text" placeholder="#tag" onChange={(e)=>setTag(e.target.value)}/>
                </div>
                <div className="amountButtons">
                    <button className="btn1" onClick={handleCreatePosts}>Submit</button>
                    <button className="close-btn" onClick={closePopUpCreatePost}>Close</button>
                </div>
            </div>
        </div>
    </>)
}
export default CreatePost;