import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register(){
  






  return(
    <div className = "register-container">
    <div className = "register-wrapper">
      <h1>CREATE AN ACCOUNT</h1>
      <form>
      <div className = "register-inputs-wrapper">
        <div className = "register-inputs-container">
          <input className = "register-input" type="text" name = "username" placeholder = "Username" />
          <input className = "register-input" type="email" name = "email" placeholder = "Email" />
        </div>
        <div className = "register-inputs-container">
          <input className = "register-input" type="password" name = "password" placeholder = "Password" />
          <input className = "register-input" type="password" name = "password-confirm" placeholder = "Confirm Password" />
        </div>
      </div>


        <p className = "register-verification-text">By creating this account, I consent to the processing of my personal data in accordance with the <span>privacy policy</span>. </p>
        <div className = "register-submit-button-wrapper">
          <button className = "register-submit-button" type= "submit" > Create </button>
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
