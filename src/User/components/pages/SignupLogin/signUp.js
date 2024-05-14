import React, { useState } from "react";
import "./signUp.css";
import SignUp from "../../image/signup.svg";
import { BASE_URL } from "../../../../constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { Authapp } from "../../../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../../../redux/user/userSlice";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
 
const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmpassword);
  };
 
  const handleGetOTP = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/getOtp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
 
      toast("OTP sent successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Handle error, show a message to the user, etc.
    }
  };
 
  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression to match a valid phone number format
    const phoneRegex = /^[0-9]{10}$/;
    // Check if the entered phone number matches the regex pattern
    return phoneRegex.test(phoneNumber);
  };
 
  const handlePhoneChange = (e) => {
    const newPhoneNumber = e.target.value;
    // Validate the new phone number
    const isValidPhoneNumber = validatePhoneNumber(newPhoneNumber);
    // Update the phone state
    setPhone(newPhoneNumber);
    // Optionally, you can display an error message if the phone number is invalid
    if (!isValidPhoneNumber) {
      // Display an error message or perform any other action
      // console.log("Invalid phone number format");
      toast("Invalid phone number format", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
 
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if passwords match when confirm password changes
    setPasswordsMatch(e.target.value === password);
  };
 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
 
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      if (!validateEmail(e.target.value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    };
 
    const isValidPhoneNumber = validatePhoneNumber(phone);
 
    if (!isValidPhoneNumber) {
      // Display an alert message for an incorrect phone number format
      toast.warn("Please enter a valid phone number.");
      return; // Prevent form submission
    }
 
    const form = { name, phone, email, password, confirmpassword, otp };
    console.log(form);
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
 
      console.log("Signup response:", response.data);
 
      if (response.status === 200) {
        if (response.data.message) {
          toast.warn(response.data.message); // Display alert message for existing email
        } else {
          toast.success("SignUp successfully!");
          navigate("/login");
        }
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle other errors if needed
      toast.error("Sign up failed. Please try again.");
    }
  };
 
  const handleInputChange = (e) => {
    // Reset the submitted state when any input field changes
    setSubmitted(false);
 
    // Handle input change as usual
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmpassword":
        setConfirmPassword(value);
        break;
      case "otp":
        setOtp(value);
        break;
      default:
        break;
    }
  };
 
  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };
 
  const handleGoogleClick = async () => {
    const auth = getAuth(Authapp);
 
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle.user.phoneNumber);
      const res = await fetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          phone: resultsFromGoogle.user.phoneNumber ?? "000",
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <main className="signup-main">
      <div className="right-signup ">
        <img src={SignUp} alt="BgImage" className="fill-image"></img>
      </div>
      <div className="left-signup">
        <div className="signup-form">
          <div className="signup-heading">
            <h1>Sign Up</h1>
            <Link to="/signupguest">
              <p>Login as guest</p>
            </Link>
          </div>
 
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="form-input"
                required={submitted}
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="form-input"
                required={submitted}
              />
            </div>
            <div className="form-field-otp">
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="form-input"
                  required
                />
                <button onClick={handleGetOTP} className="get-otp-button">
                  Get OTP
                </button>
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Enter Otp
                </label>
                <input
                  type="otp"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
 
            <div className="form-field">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-input"
                required={submitted}
              />
            </div>
            <div className="form-field">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmpassword}
                onChange={handleConfirmPasswordChange}
                className="form-input"
                required={submitted}
              />
              {!passwordsMatch && (
                <p style={{ color: "red" }}>Passwords do not match.</p>
              )}
            </div>
            <div className="form-field  terms-privacy">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="form-checkbox"
                required={submitted}
              />
 
              <label htmlFor="terms" className="form-label">
                Agree to our Terms of use and Privacy Policy
              </label>
            </div>
            <div className="form-final-button">
              <button
                type="submit"
                className="submit-button"
                onClick={() => setSubmitted(true)}
              >
                Sign Up
              </button>
 
              {/* Google Sign In Button */}
              <button type="button" onClick={handleGoogleClick}>
                <FcGoogle />
              </button>
            </div>
            <div className="form-final-div">
              <p>Already have an account?</p>
              <Link to="/login">
                {" "}
                <h3>Log In</h3>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
 
export default Signup;