import React, { useState, useEffect } from "react";
import fox from "../../images/admin01.svg";
import "./assetManagement.css";
import { Link } from "react-router-dom";
import SideBar from "../../common/sideBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../constant";
 
const AssetManagement = () => {
  const [categoryDataList, setCategoryDataList] = useState([]);
  const [activeItem, setActiveItem] = useState("assetmanagement");
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    // setShowProfile(false);
  };
 
  useEffect(() => {
   
    // Fetch category data from the backend
    axios
      .get(`${BASE_URL}/category/getAllCategory`)
      .then((response) => {
        // Access the array of categories from the response data
        const categories = response.data.allCategory;
        setCategoryDataList(categories);
        console.log(categories);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);
 
  return (
    <div className="asset-management-container">
      <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
      <div className="asset-management-main">
        <div className="asset-management-heading">
          <h1>Asset Management</h1>
          <div className="asset-management-content">
          <div className="asset-management-content-assets">
              {categoryDataList.map((categoryData) => (
               
                <Link
                key={categoryData._id}
                to={{
                  pathname: `/assetCategoryList/${categoryData._id}/${categoryData.categoryName}`,
                  state: {
                    categoryId: categoryData._id,
                    categoryName: categoryData.categoryName // Pass categoryName in the state
                  },
                }}
                onClick={() => console.log("Category ID:", categoryData._id ,"Category Name:", categoryData.categoryName)}
              >
           
                  <div className="asset-image-container">
                    <img src={categoryData.imageUrl} alt="Fox" />
                    <p>{categoryData.categoryName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AssetManagement;