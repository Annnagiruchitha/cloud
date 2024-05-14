// import React from "react";
// import { useState, useEffect } from "react";
// import avatar1 from "../../../image/component1.svg";
// import avatar2 from "../../../image/component2.svg";
// import avatar3 from "../../../image/component3.svg";
// import avatar4 from "../../../image/component4.svg";
// import Background from "../../../image/HomeBackground.svg";

// function AvatarAnime() {
//   const [currentAvatar, setCurrentAvatar] = useState(0);
//   const avatars = [avatar1, avatar2, avatar3, avatar4];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentAvatar((prevAvatar) => (prevAvatar + 1) % avatars.length);
//     }, 2500);

//     return () => clearInterval(interval);
//   }, [avatars.length]);

//   return (
//     <div className=" relative h-screen ">
//       <div
//         className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
//         style={{
//           backgroundImage: `url(${Background})`,
//           width: "520px",
//           height: "550px",
//           top: "5%",
//           left: "50%",
//           transform: "translateX(-50%)",
//         }}
//       ></div>

//       <div className="flex items-center justify-center h-screen bg-black ">
//         {avatars.map((avatar, index) => (
//           <img
//             key={index}
//             src={avatar}
//             alt={`Avatar ${index + 1}`}
//             className={`absolute transition-opacity duration-1000 ${
//               index === currentAvatar ? "opacity-100" : "opacity-0"
//             }`}
//             style={{ maxWidth: "400px", maxHeight: "450px", top: "20%" }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AvatarAnime;
