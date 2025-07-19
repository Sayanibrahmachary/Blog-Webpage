import './SignUp.css';
import React, { useState, useRef, useEffect  } from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faEnvelope,faLock,faCircleUser,faLocationDot,faPlus} from '@fortawesome/free-solid-svg-icons';

function SignUp()
{
    const [files, setFiles] = useState(null);
    const[isFile,setIsFile]=useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [bio,setBio]=useState("");
    const [address,setAddress]=useState("");
    const [imgPath, setImgPath] = useState("");

    const handleFileChange = (event) => {
        //console.log(event.target.files[0]);
        setFiles(event.target.files[0]); // Save only the first file
        setIsFile(true);
        setImgPath(event.target.files[0]);
    };

    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio);
        formData.append("address", address);
        formData.append("avatar", files);
        

        try
        {
            const response=await fetch(`http://localhost:8000/api/v1/users/register`,{
                method:"POST",
                credentials: "include",
                body:formData,
            });
            //console.log(response);

            const result = await response.json();
            if (response.ok) {
                alert("user created successfully!");
            } else {
                alert(result.message || "Something went wrong!");
            }
        }catch (e) {
            console.error("Error:", e);
            alert("Something went wrong!");
        }
    }
    const fileInputRef = useRef(null);
    const handleClick = () => {
        fileInputRef.current.click(); // Programmatically click the hidden file input
    };

    return (<>
        <div className="signUpCustomerPage">
            <div className="container">
                <div className="left-container">
                    <div className="left">
                        <img src="./src/assets/download (4).jpg"></img>
                        <div className="left-div">
                            <div className="left-div-text">
                                <h1>WELCOME BACK</h1>
                                <br/>
                                <h3>Nature is pleased with simplicity and Nature is the source of true knowledge</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    <div className="right">
                        <div className="rightTop">
                            <div className="upperText">
                                <div className="firstDiv">
                                    <h2>Sign up</h2>
                                </div>
                                <div className="line">
                                    <p>Sign up to Continue</p>
                                </div>
                            </div>
                            <div className="profilePic">
                                    <button onClick={handleClick} className="customer1">
                                      <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: 'grey' }} />
                                    </button>

                                    {/* Hidden file input */}
                                    <input
                                      type="file"
                                      ref={fileInputRef}
                                      onChange={handleFileChange}
                                      style={{ display: 'none' }}
                                    />

                                    <div className="imageProfilePic">
                                      {isFile? <img src={`./src/assets/${imgPath.name}`} alt="profile" /> :<img src="./src/assets/download (5).jpg" alt="profile" />}
                                    </div>
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
                            <div className="input-div">
                                <div className="i1"> 
                                    <FontAwesomeIcon icon={faCircleUser} className="customer"/>
                               </div>
                               <input required type="text" placeholder="bio" onChange={(e)=>setBio(e.target.value)}/>
                            </div>
                            <div className="input-div">
                                <div className="i1"> 
                                    <FontAwesomeIcon icon={faLocationDot} className="customer" />
                               </div>
                               <input required type="text" placeholder="address" onChange={(e)=>setAddress(e.target.value)}/>
                            </div>
                            <div className="loginPage">
                                <p>Do you already have an account?</p>
                                <NavLink to='/login'>Login</NavLink>
                            </div>
                            <div className="buttonSignUpCustomer">
                                <div className="submitSignUpCustomer">
                                    <button type="submit" className="submitButtonSignUpCustomer" onClick={handleSubmit}>Submit</button>
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
            </div>
        </div>
    </>)
}

export default SignUp;
