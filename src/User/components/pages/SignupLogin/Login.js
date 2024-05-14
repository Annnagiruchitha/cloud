import React, { useState } from "react";
import "./Login.css";
import login from "../../image/signup.svg";
import { Link ,Router} from "react-router-dom";
import { useFunc} from "../../../../redux/user/helperFunctions"
 
 
const Login = ({children}) => {
  const {handleSubmit,handleChange}= useFunc();
 
 
  return (
   
    <main className="login-main">
      <div className="right-login">
        <img src={login} alt="BgImage" className="login-fill-image"></img>
      </div>
      <div className="left-login">
        <div className="login-form">
          <div className="login-heading">
            <h1>Login</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-form-field">
              <label htmlFor="email" className="login-form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="login-form-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-form-field">
              <label htmlFor="password" className="login-form-label">
                Your Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="login-form-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="loginform-final-button">
              <button type="submit" className="login-submit-button">
                Login
              </button>
              {/* Google Sign In Button */}
              {/* Add your Google Sign In button here */}
            </div>
            <div className="login-form-final-div">
              <p>Don't have an account?</p>
              <Link to={"/signup"}>
                <h3>SignUp</h3>
              </Link>
             
            </div>
          </form>
        </div>
      </div>
    </main>
    
  );
};
 
export default Login;