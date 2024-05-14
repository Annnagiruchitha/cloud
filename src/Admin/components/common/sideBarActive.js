// import React, { useState } from "react";
// import "./sideBarActive.css"
// import SideBar from "./sideBar";
// import AdminCategory from "../pages/adminCategory/adminCatergory";
// import AdminUserManage from "../pages/UserManagement/userManage";
// import AdminPurchase from "../pages/adminPurchase/adminPurchase";
// import AssetManagement from "../pages/AssetManagement/assetManagement";

// const SideBarActive = () => {
//   const [activeItem, setActiveItem] = useState("category");

//   const handleItemClick = (itemName) => {
//     setActiveItem(itemName);
//   };

//   return (
//     <div className="sidebar-active-main-container ">
//       <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
//       <div className="sidebar-active-main-content">
//         {renderPage(activeItem)}
//       </div>
//     </div>
//   );
// };

// const renderPage = (activeItem) => {
//   switch (activeItem) {
//     case "category":
//       return <AdminCategory />;
//     case "userManagement":
//       return <AdminUserManage />;
//     case "purchasehistory":
//       return <AdminPurchase />;
//     case "assetmanagement":
//       return <AssetManagement />;
//     default:
//       return null;
//   }
// };

// export default SideBarActive;
