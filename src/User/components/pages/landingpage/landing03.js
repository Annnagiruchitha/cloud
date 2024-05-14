import React, { useState, useRef } from 'react';
import "./landing03.css";
import backgroundImage from "../../image/bg02.svg"
import { BASE_URL } from "../../../../constant";
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';
import { BsFullscreen } from 'react-icons/bs';
import demo from "../../images/category/DigAmenD full service.mp4"


 
const Landing03 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback_text, setFeedbackTask] = useState('');
  const playerRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowPlayButton(true); 
  };

  const handleVideoPlay = () => {
    setVideoEnded(false);
    setShowPlayButton(false); 
  };

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0); 
      playerRef.current.play();
    }
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      playerRef.current.wrapper.requestFullscreen();
    }
  };


 

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = { name, phone, email, feedback_text };
    await fetch(`${BASE_URL}/feedback/userFeedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Message not sent");
        }
        return responseData;
      })
      .then((data) => {
        console.log("Message sent");
        setName('');
        setEmail('');
        setPhone('');
        setFeedbackTask('');
       
       
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message || "Please try again."); // Display alert message for error
      });
  };
  return (
    <div className="container02">
          <div className="video-main"
        
        >
          <div className='video-contain'>
      <div className="video-container">
      <div className="video-player-container">
        <ReactPlayer
          ref={playerRef}
          url={demo}
          // width="100%"
          // height="100%"
          playing={handlePlay}
          onEnded={handleVideoEnd}
          onPlay={handleVideoPlay}
        />
        {/* {!videoEnded && showPlayButton && (
          <div className="play-icon-overlay" onClick={handlePlay}>
            <FaPlay size={50} />
          </div>
        )}
        <div className='fullscreen-icon-overlay' onClick={handleFullscreen}>
          <BsFullscreen size={25} />
        </div> */}
      </div>
      </div>
 
      {/* Right Side Container for Form Submission */}
      <div className="form-container">
        <h1>Tell Us About Your Idea</h1>
        <form onSubmit={handleSubmit} className="form-con">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="form-border"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Id"
            className="form-border"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Your Mobile Number"
            className="form-border"
            required
          />
          <textarea
            name="message"
            value={feedback_text}
            onChange={(e) => setFeedbackTask(e.target.value)}
            placeholder="What Design Task Do You Have?"
            className="form-border-long"
            required
          />
          <button type="submit" className="form-btn">
            Submit
          </button>
        </form>
      </div>
      </div>
      </div>
    </div>
  );  
};
 
export default Landing03;