import React,{useState} from "react";
import "./ChangePassword.css";

function ChangePassword({closePopup})
{
    const [oldPassword,setOldPassword]=useState(null);
    const [newPassword,setNewPassword]=useState(null);

    const changePassword=async(e)=>
    {
        try{

            const data={
                oldPassword:oldPassword,
                newPassword:newPassword,
            }
            const token=localStorage.getItem("token");

            if(!token)
            {
                console.error("No token found. Please log in.");
                alert("You are not logged in.");
                return;
            }
            const response=await fetch(`http://localhost:8000/api/v1/users/changePassword`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body:JSON.stringify(data),
            })
            
            const result = await response.json();
            if(response.ok)
            {
                alert("Password is changed successfully");
            }
            else
            {
                alert(result.message || "Something went wrong in time of changeing the password!");
            }
        }
        catch(e)
        {
            console.error(e);
            alert(`Problem in Change Password`);
        }
    }
    
    return (<>
        <div className="amount-container">
            <div className="popup">
                <h2>ChangePassword</h2>
                <div className="selectAmount">
                    <input type="password" placeholder="old Password" onChange={(e)=>setOldPassword(e.target.value)}/>
                    <input type="password" placeholder="new Password" onChange={(e)=>setNewPassword(e.target.value)}/>
                </div>
                <div className="amountButtons">
                    <button className="btn1" onClick={changePassword}>Submit</button>
                    <button className="close-btn" onClick={closePopup}>Close</button>
                </div>
            </div>
        </div>
    </>)
}

export default ChangePassword;