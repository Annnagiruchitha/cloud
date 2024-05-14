import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import avatar1 from "../../../image/Suresh RK CC 1 1.svg";
import avatar2 from "../../../image/amar3.svg";
import avatar3 from "../../../image/kiran2 1.svg";
import avatar4 from "../../../image/meta3.svg";
import avatar5 from "../../../image/park 1.svg";
import avatar6 from "../../../image/mani 1.svg";
import Background from "../../../image/HomeBackground.svg";
import { Link, useNavigate } from "react-router-dom";

function Landing01() {
  const [currentAvatar, setCurrentAvatar] = useState(0);
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    
  ];
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate("/payment");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAvatar((prevAvatar) => (prevAvatar + 1) % avatars.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [avatars.length]);
  return (
    <div className="landing1-container">
      <div className="landing1-main">
        <div className="landing1-left">
          <h2>Discover, Explore & buy 3D Character</h2>
          <h1>
            Unveil the Third Dimension:
            <br /> Explore, Create, Shop!
          </h1>
          <p>
            Explore our curated selection of 3D models spanning
            <br /> various categories such as architecture, characters, <br />
            Vehicles, Animals, Marine life etc.,
          </p>
          <button onClick={handleBuyNowClick}>Buy Now</button>
        </div>
        <div className="landing1-right">
          <div className="landing1-outline">
            <img src={Background} alt="background" />

            <div className="landing1-avatar">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`absolute transition-opacity duration-1000 ${
                    index === currentAvatar ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    maxWidth: "400px",
                    maxHeight: "450px",
                    bottom: `15px`, // Adjust top position for overlapping effect
                    left: `80px`, // Adjust left position for overlapping effect
                    zIndex: avatars.length - index, // Ensure the order of overlapping
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing01;
