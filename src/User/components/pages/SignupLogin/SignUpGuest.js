import React from "react";
import "./SignUpGuest.css";
import GuestBg from "../../image/signup.svg";
import { Link, useNavigate } from "react-router-dom";

function SignUpGuest() {
  return (
    <main className="guest-signup-main">
      <div className="guest-right-signup ">
        <img src={GuestBg} alt="BgImage" className="guest-fill-image"></img>
      </div>
      <div className="guest-left-signup">
        <div className="guest-signup-form">
          <div className="guest-signup-heading">
            <h1>SignUp as Guest</h1>
          </div>
          <form>
            <div className="guest-form-field">
              <label htmlFor="name" className="guest-form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="guest-form-input"
              />
            </div>
            <div className="guest-form-field">
              <label htmlFor="phone" className="guest-form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="guest-form-input"
              />
            </div>
            <div className="guest-form-final-button">
              <Link to={"/landingmain"}>
              <button type="submit" className="guest-submit-button">
                SignUp as Guest
              </button></Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignUpGuest;
