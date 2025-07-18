import './SignUp.css';
import React, { useState } from "react";
import { NavLink,useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faEnvelope,faLock,faPlus} from '@fortawesome/free-solid-svg-icons';

function Login()
{
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [nextPage,setNextPage]=useState(false);

    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        const data=
        {
            username:name,
            email: email,
            password:password,
        }

        try
        {
            const response=await fetch(`http://localhost:8000/api/v1/users/login`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                alert("user login successfully!");
                localStorage.setItem("token", result.data.accessToken);
				const token =localStorage.getItem("token");

                localStorage.setItem("userId", result.data.user._id);
                const userId =localStorage.getItem("userId");

                setNextPage(true);

                navigate('/homePageUser');

            } else {
                alert(result.message || "Something went wrong!");
            }
        }catch (e) {
            console.error("Error:", e);
            alert("Something went wrong!");
        }
    }
    
    return (<>
        <div className="right-container">
            <div className="right-login">
                <div className="rightTop-login">
                    <div className="upperText">
                        <div className="firstDiv">
                            <h2>Log In</h2>
                        </div>
                        <div className="line">
                            <p>Log In to Continue</p>
                        </div>
                    </div>
                    <div className="profilePic">
                            <button className="customer1">
                              <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: 'grey' }} />
                            </button>
                            <img src="./src/assets/download (5).jpg" alt="profile" className="imageProfilePic"/>
                    </div>
                    <div className="input-div">
                        <div className="i1"> 
                            <FontAwesomeIcon icon={faUser} className="customer"/>
                       </div>
                        <input type="text" id="text" placeholder="username" required onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="input-div">
                        <div className="i1"> 
                            <FontAwesomeIcon icon={faEnvelope} className="customer"/>
                       </div>
                        <input type="email" id="email" placeholder="email" required onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="input-div">
                        <div className="i1"> 
                            <FontAwesomeIcon icon={faLock} className="customer"/>
                       </div>
                       <input required type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="buttonSignUpCustomer">
                        <div className="submitSignUpCustomer">
                            <button type="submit" className="submitButtonSignUpCustomer" onClick={handleSubmit}>Login</button>
                        </div>
                        <div className="submitSignUpCustomer">
                            <NavLink to="/">
                                <button type="submit" className="submitButtonSignUpCustomer">Cancel</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Login;