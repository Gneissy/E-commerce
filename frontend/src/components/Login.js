import React from "react";
import "./Login.css"
import axios from "axios";
import { loginBegin, loginSuccessful, loginFailure, logout } from "../store/index";
import { publicRequest } from "../reqMethods";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";


function Login(){


  const dispatch = useDispatch();

  // Login process function, using redux reducers
  const login = async function(dispatch, user){
    // Those reducers are in userSlice.js in redux store.
    dispatch(loginBegin()); // Now isFetching is true, process is on.
    try{
        // This is axios post method, public accessable
        const res = await publicRequest.post("/auth/login", user);
        // res.data will be updated as "currentUser"
        // res.data is actually an object containing name, image, email etc...
        dispatch(loginSuccessful(res.data)); // res.data is "action.payload" here.
    } catch (err){
        dispatch(loginFailure()); // state.error is "true" here.
    }
  }

  // const logout = async function(dispatch, user){
  //   dispatch(logout());
  // }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isFetching, error} = useSelector(function (state){
    return state.user; // Get these from Redux store
  });
    

  // console.log(isFetching, error);

  const handleUsernameChange = function(event){ setUsername(event.target.value); }
  const handlePasswordChange = function(event){ setPassword(event.target.value); }
  const handleLoginSubmit = function(event){
    event.preventDefault();

    // From redux
    login(dispatch, { // this is payload
      username: username,
      password: password
    });
  }

  return (
    <div className = "login-container">
      <div className = "login-wrapper">
        <h1> SIGN IN </h1>
        <form>
        <div className = "login-inputs-wrapper">
          <div className = "login-inputs-container">
            <input className = "login-input" onChange = { handleUsernameChange } type="text" name = "username" placeholder = "Username" />
          </div>
          <div className = "login-inputs-container">
            <input className = "login-input" onChange = { handlePasswordChange } type="password" name = "password" placeholder = "Password" />
          </div>
        </div>

        <div className = "login-redirection-container">
          <a href = "#" className = "login-redirection-text"> Forgot my password </a>
          <Link to = "/register" className = "login-redirection-text"> Create a new account</Link>
        </div>

          <div className = "login-submit-button-wrapper">
            <button className = "login-submit-button" type= "submit" disabled={isFetching} onClick = { handleLoginSubmit }> LOGIN </button>
            { error &&
              <p className = "login-failure-text">Username or password is wrong.</p> 
            }
          </div>
        </form>
      </div>
    </div>
  );
}


export default Login;
