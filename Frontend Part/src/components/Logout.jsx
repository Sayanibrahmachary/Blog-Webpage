import React from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";

function Logout({closePopUpLogout}) {

    const navigate=useNavigate();

    const handleLogout=async(e)=>
    {
        try{

            const token=localStorage.getItem("token");
            if(!token)
            {
                console.error("No token found. Please log in.");
                alert("You are not logged in.");
                return;
            }

            const response=await fetch(`http://localhost:8000/api/v1/users/logout`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            const result = await response.json();
            if(response.ok)
            {
                alert("Your account is logout successfully");
                navigate("/login");
            }
            else
            {
                alert(result.message || "Something went wrong in time of logout your account!");
            }
        }
        catch(e)
        {
            console.error(e);
            alert(`Something is wrong in logout`);
        }
    }


    return(<>
        <div className="logout-container">
            <div className="popup">
                <h2>Logout</h2>
                <div className="msg">
                    <p>Are you sure you wnats to logout your account?</p>
                </div>
                <div className="amountButtons">
                    <button className="btn1" onClick={handleLogout}>Logout</button>
                    <button className="close-btn" onClick={closePopUpLogout}>Close</button>
                </div>
            </div>
        </div>
    </>)
}

export default Logout;