import React, { useState, useEffect } from "react";
import "./profile.css";
import img1 from "../../image/profilefox.svg";
import img5 from "../../image/007.svg";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useFunc } from "../../../../redux/user/helperFunctions";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../../../redux/user/userSlice";
import { BASE_URL } from "../../../../constant";

function HistoryCard() {
  return (
    <div className="card-profile">
      <div className="card-profile-main">
        <div className="card-profile-main-content">
          <div className="image-profile">
            <img src={img1} alt="Fox" />
          </div>
          <div className="content-profile">
            <div className="title-profile01">
              <p>Fox</p>
            </div>
            <div className="title-profile02">
              <p>Purchased On:</p>
              <h3>27 June 2023</h3>
            </div>
            <div className="title-profile03">
              <img src={img5} alt="im" />
              <h3>390</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard() {
  const { currentUser } = useSelector((state) => state.user);

  const [showPopup, setShowPopup] = useState(false); // State for managing popup visibility
  const { handleLogout } = useFunc();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(currentUser);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Check if currentUser exists before making the request
        if (!currentUser) return;

        const res = await fetch(
          `${BASE_URL}/user/getParticularUser?id=${currentUser._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await res.json();
        if (data.status !== 200) {
          throw new Error(data.message);
        }
        // Update state or dispatch action to store user details
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  const routeChange = () => {
    let path = "/login";
    navigate(path);
  };

  // console.log(Response.user);
  const handleDeleteUser = async () => {
    setShowPopup(false);
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`${BASE_URL}/user/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`, // Include user token for authentication
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      const data = await res.json();
      dispatch(deleteUserSuccess(data));
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleDeleteAccount = async () => {
    setShowPopup(true);
  };

  return (
    <div className="user-profile">
      <div className="profile-item01">
        <h4>Name</h4>
        <p>{currentUser?.name}</p>
      </div>
      <div className="profile-item01">
        <h4>Email</h4>
        <p>{currentUser?.email}</p>
      </div>
      <div className="profile-item01">
        <h4>Phone Number</h4>
        <p>{currentUser?.phone}</p>
      </div>
      <div className="profile-item02">
        <p onClick={handleDeleteAccount}>Delete Account</p>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Are you sure you want to delete your account?</h3>
              <div className="popup-btn">
                <button onClick={() => handleDeleteUser()}>Delete</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            routeChange();
            handleLogout();
          }}
        >
          Log Out
        </button>
      </div>
      {showPopup && <div className="backdrop"></div>} {/* Backdrop */}
    </div>
  );
}

function HistoryList() {
  return (
    <div className="container-profile">
      <div className="main-profile01">
        <div className="container-profile-main">
          <div className="main-heading-profile">
            <h1>View Order Details</h1>
            <div className="container-profile-main01">
              <HistoryCard />
              <hr />
              <HistoryCard />
            </div>
          </div>
          <div className="main-profile02">
            <div className="main-heading-profile">
              <h1>Personal Details</h1>
              <div className="container-profile-main02">
                <ProfileCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryList;
