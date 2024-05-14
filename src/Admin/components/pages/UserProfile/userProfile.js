import React, { useEffect, useState } from "react";
import "./userProfile.css";
import back from "../../images/back.svg";
import SideBar from "../../common/sideBar";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../constant";
 
const TabContent = ({ content }) => {
  // Check if content is undefined or null
  if (!content) {
    return null; // or you can return a message or fallback content
  }
 
  return (
    <div className="user-profile-purchase-table">
      {content.map((item, index) => (
        <div key={index} className="user-profile-purchase-table-content">
          <h1>{item.label}:</h1>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};
 
const AdminUserProfile = () => {
  const [activeItem, setActiveItem] = useState("userManagement");
  const [activeTab, setActiveTab] = useState("purchaseHistory");
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    console.log(userId);
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/user/getParticularUser?id=${userId}`, {
          method: "GET",
         
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data.message)
          setUsers(data.message);
         console.log(users);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error(error.message);
        // Handle error, show message to user, etc.
      }
    };
 
    if (currentUser && currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);
 
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
 
  const tabData = {
    purchaseHistory: [
      { label: "Asset Name", value: "Dog" },
      { label: "ID", value: "31246" },
      { label: "Purchase Date", value: "DD/MM/YYYY" },
      { label: "Prize", value: "₹ 300" },
    ],
    favorite: [
      { label: "Asset Name", value: "Dog" },
      { label: "ID", value: "31246" },
      { label: "Prize", value: "₹ 300" },
    ],
    cart: [
      { label: "Asset Name", value: "Dog" },
      { label: "ID", value: "31246" },
      { label: "Added On", value: "DD/MM/YYYY" },
      { label: "Prize", value: "₹ 300" },
    ],
  };
 
  return (
    <div className="user-profile-container">
      <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
      <div className="user-profile-main">
        <div className="user-profile-content">
          <div className="user-profile-content-heading">
           <Link to ="/userManagement" ><img src={back} alt="Back" /></Link>
            <h1>Profile</h1>
          </div>
          <div className="user-profile-content-details-main">
            <div className="user-profile-content-details">
              <div className="user-profile-content-details-profile">
                <h1>User Name</h1>
                <p>{users.name}</p>
              </div>
              <div className="user-profile-content-details-profile">
                <h1>Email ID</h1>
                <p>{users.email}</p>
              </div>
              <div className="user-profile-content-details-profile">
                <h1>Phone Number</h1>
                <p>{users.phone}</p>
              </div>
            </div>
            <div className="user-profile-purchase-details">
              <div className="user-profile-toggle">
                {Object.keys(tabData).map((key) => (
                  <button
                    key={key}
                    className={activeTab === key ? "active" : ""}
                    onClick={() => setActiveTab(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
              {activeTab && <TabContent content={tabData[activeTab]} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AdminUserProfile;