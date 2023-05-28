import React from "react";
import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../reqMethods";

function Register(){

  // For redirection of successful register
  const navigate = useNavigate();

  // Input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Input changing handlers
  const handleUsernameChange = function(event){ setUsername(event.target.value); }
  const handleEmailChange = function(event){ setEmail(event.target.value); }
  const handlePasswordChange = function(event){ setPassword(event.target.value); }
  const handleConfirmPasswordChange = function(event){ setConfirmPassword(event.target.value); }

  // console.log(username, email, password, confirmPassword); // kk

  // Register button's functionality
  const handleSubmit = async function(event){
    // Register
    event.preventDefault();
    const res = await publicRequest.post("/auth/register", {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    });
    // console.log(res.status);
    if (res.status === 201){
      // Redirect to /login page
      navigate("/registerSuccess");
    }
  }


  return(
    <div className = "register-container">
      <div className = "register-wrapper">
        <h1>CREATE AN ACCOUNT</h1>
        <form>
        <div className = "register-inputs-wrapper">
          <div className = "register-inputs-container">
            <input className = "register-input" type="text" name = "username" placeholder = "Username" onChange = { handleUsernameChange } />
            <input className = "register-input" type="email" name = "email" placeholder = "Email" onChange = { handleEmailChange } />
          </div>
          <div className = "register-inputs-container">
            <input className = "register-input" type="password" name = "password" placeholder = "Password" onChange = { handlePasswordChange } />
            <input className = "register-input" type="password" name = "password-confirm" placeholder = "Confirm Password" onChange = { handleConfirmPasswordChange } />
          </div>
        </div>


          <p className = "register-verification-text">By creating this account, I consent to the processing of my personal data in accordance with the <span>privacy policy</span>. </p>
          <div className = "register-submit-button-wrapper">
            <button className = "register-submit-button" type= "submit" onClick = { handleSubmit }> Create </button>
          </div>

        </form>



        <div className = "register-to-login-wrapper">
          <p className = "register-to-Login">Already signed up? <Link to ="/login"> Login <i class="fa-solid fa-right-long"></i> </Link> </p>
        </div>
      </div>



    </div>

  );
}



export default Register;
