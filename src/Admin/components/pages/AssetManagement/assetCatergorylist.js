import React, { useState, useEffect } from "react";
import "./assetCatergorylist.css";
import SideBar from "../../common/sideBar";
import back from "../../images/back.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../constant";

const AssetCatergorylist = () => {
  const [activeItem, setActiveItem] = useState("assetmanagement");
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);

  // Extract categoryId and categoryName from the route parameters
  const { categoryId, categoryName } = useParams();

  useEffect(() => {
    console.log("Category ID:", categoryId);
    console.log("Category Name:", categoryName);

    const fetchAssets = async () => {
      try {
        if (categoryId) {
          const response = await axios.get(
            `${BASE_URL}/asset/getByCategory/${categoryId}`
          );
          console.log(response.data);
          setAssets(response.data.assets);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [categoryId, categoryName]);

  const handleClick = () => {
    navigate(`/addnewAsset/${categoryId}`);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  console.log("assettsss",assets);
  return (
    
    <div className="assetlist-container">
      <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
      <div className="assetlist-main">
        <div className="assetlist-content">
          <div className="assetlist-heading">
            <div className="assetlist-heading-text">
              <Link to="/assetManagement">
                <img src={back} alt="Back" />
              </Link>
              <h1>AssetManagement |</h1>
              <p>{categoryName}</p>
            </div>
            <div className="assetlist-heading-button">
              <button onClick={handleClick}>Add Asset</button>
            </div>
          </div>
          <div className="assetlist-details-table">
            <div className="assetlist-details">
              {assets.map((asset, index) => (
                <Link to= {`/editAsset/${asset._id}`}>
                <div className="assetlist-details-content" key={index}>
                  <h1>{index + 1}</h1>
                  <div className="assetlist-details-content">
                    <h1>Asset Name :</h1>
                    <p>{asset.assetName}</p>
                  </div>
                  <div className="assetlist-details-content">
                    <h1>Id :</h1>
                    <p>{asset.id}</p>
                  </div>
                  <div className="assetlist-details-content">
                    <h1>File Size :</h1>

                    <p>
                      {asset.files &&
                        asset.files.map((file, index) => (
                          <div key={index}>
                            <p>{file.size}</p>
                          </div>
                        ))}
                    </p>
                  </div>
                  <div className="assetlist-details-content">
                    <h1>File Format :</h1>
                    <p>
                      {asset.files &&
                        asset.files.map((file, index) => (
                          <div key={index}>
                            <p>{file.format}</p>
                          </div>
                        ))}
                    </p>
                  </div>
                  <div className="assetlist-details-content">
                    <h1>Price :</h1>
                    <p>{asset.price}</p>
                  </div>
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

export default AssetCatergorylist;
