import React, { useState , useEffect } from "react";
import "./assetsPopup.css";
import image from "../../images/category/27.svg";
import rupee from "../../images/icons/23.svg";
import img01 from "../../images/icons/28.svg";
import img02 from "../../images/icons/29.svg";
import img03 from "../../images/icons/30.svg";
import plus from "../../images/icons/32.svg";
import like from "../../images/icons/31.svg";
import tick from "../../images/icons/33.svg";
import unlike from "../../images/icons/34.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../constant";
import Model from "../modelViewer";
 
const AssetsPopup = ({image}) => {
  const [imgSrc, setImgSrc] = useState(unlike);
  const [imgPlus, setImgPlus] = useState(plus);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const ID = useParams();
  console.log("assetId",ID);
  const id=ID.assetId;
  console.log(id);
  const [particularAssetData, setParticularAssetData]= useState([]);
 useEffect(() => {
    axios
      .get(`${BASE_URL}/asset/getAssets/${id}`)
      .then((response) => {
        // Access the array of categories from the response data
        const particularAssetData = response.data.asset;
        setParticularAssetData(particularAssetData);
        console.log("dataassets",particularAssetData);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, [id]);
 
 
 
 
 
 
 
 
 
  const handleClick = () => {
    setImgSrc(imgSrc === unlike ? like : unlike);
  };
 
  const handleClick01 = () => {
    setImgPlus(imgPlus === plus ? tick : plus);
  };
 
  const handledownloadClick = () => {
    setPopupVisible(true); // Show the popup when "Buy Now" is clicked
  };
 
  const handleClosePopup = () => {
    setPopupVisible(false); // Close the popup when the close button is clicked
  };
 
 
  // useEffect(() => {
  //   // Dynamically load the Dimensions scripts if necessary
  //   // This is a simplified example; in a real app, you'd check if it's already loaded
  //   const scriptTag1 = document.createElement('script');
  //   scriptTag1.src = 'https://dimensions-3d-viewer.cloudinary.com/all.js';
  //   document.body.appendChild(scriptTag1);
 
  //   const scriptTag2 = document.createElement('script');
  //   scriptTag2.src = 'https://dimensions-tag.cloudinary.com/all.js';
  //   document.body.appendChild(scriptTag2);
 
  //   scriptTag2.onload = () => {
  //     // Initialize the 3D viewer after the script is loaded
  //     if (window.initDimensions) {
  //       const d8sApi = window.initDimensions({
  //         account: 'd8s-rvttbv',
  //         viewers: ['3D'],
  //       });
  //     }
  //   };
  // }, []);
 
  const firstFile = particularAssetData.files && particularAssetData.files.length > 0 ? particularAssetData.files[0] : null;
 
 
  return (
    <div id="assets-popup" className="assets-popup-container">
    {isPopupVisible && (
      <div className="download-popup">
      <div className="download-popup-content">
       <div className="download-popup-content-main">
        <h1>Download</h1>
        <button className="download-close-button" onClick={handleClosePopup}>
          &times;
        </button></div>
        <div className="download-popup-heading">
            <h1>Available Download</h1>
           
        </div>
 
     
       
          <div className="download-popup-types">
            <p>fbs</p>
            <p>30mb</p>
            <button
            type="button"
            className="download-popup-button">
            Download
          </button>
          </div>
          <div className="download-popup-types">
            <p>USDZ</p>
            <p>34mb</p>
            <button
            type="button"
            className="download-popup-button">
            Download
          </button>
          </div>
          <div className="download-popup-types">
            <p>glTF</p>
            <p>25mb</p>
            <button
            type="button"
            className="download-popup-button">
            Download
          </button>
          </div>
          <div className="download-popup-types">
            <p>GLB</p>
            <p>24mb</p>
            <button
            type="button"
            className="download-popup-button">
            Download
          </button>
          </div>
   
         
     
      </div>
    </div>
    )}
      <div className={`assets-popup-main  ${ isPopupVisible? "blur-background" : ""}`}>
        <div className="assets-popup-section1">
        <div className="assets-popup-section1-img"
        style={{height:"400px" , background:"white"}} >
        {firstFile && <Model widthPercent={100} height={400} modelUrl={firstFile.url} />}
      </div>
          <div className="assets-popup-description">
            <h2>Asset Description:</h2>
            <p>
              {particularAssetData.description}
            </p>
          </div>
          {/* <div className="assets-popup-similar-sets">
                <h2>Similar Assets:</h2>
                <div className="card-assets">
            <div className="box-assets">
                <div className='image-assets' >
                    <img src={data.files[0].name} alt={data.name} />
                </div>
                <div className='content-assets'>
                    <div className='title-assets01'>
                        <p>{data.name}</p>
                        <img src={imgSrc} alt="Like" onClick={handleClick} />
                    </div>
                    <div className='title-assets02'>
                        <img src={download} alt="Download" />
                        <p>{data.files[0].size}</p>
                        <img src={rupee} alt="Rupee" />
                        <h4>{data.price}</h4>
                    </div>
                    </div>
                <div className="icon-assets">
                    <div className="iconbox-assets">
                        <img src={imgPlus} onClick={handleClick01} alt="Plus" />
                    </div>
                </div>
               
            </div>
        </div>
          </div> */}
        </div>
        <div className="assets-popup-section2">
          <div className="assets-popup-heading">
            <h1>{particularAssetData.assetName}</h1>
          </div>
          <div className="assets-popup-value">
            <img src={rupee} alt="Rupee Symbol" />
            <h1>{particularAssetData.price}</h1>
          </div>
          <div className="assets-popup-buy">
           
          <button onClick={handledownloadClick}>Buy Now</button>
           
            <img src={imgPlus} onClick={handleClick01} alt="Plus" />
            <img src={imgSrc} alt="Image" onClick={handleClick} />
          </div>
          <div className="assets-popup-description1">
            <img src={img01} alt="Secure Payment" />
            <p>Secure Payment</p>
          </div>
          <div className="assets-popup-description1">
            <img src={img02} alt="100% Support" />
            <p>100% Support</p>
          </div>
          <div className="assets-popup-description1">
            <img src={img03} alt="Access to future version" />
            <p>Access to future version</p>
          </div>
 
          <div className="assets-popup-format-box">
            <div className="assets-popup-format">
              <h1>Format:</h1>
              <p>{particularAssetData.files && particularAssetData.files.map((file, index) => (
    <div key={index}>
      <p>{file.format}</p>
    </div>
  ))}</p>
            </div>
            <hr />
            <div className="assets-popup-format">
              <h1>File Size:</h1>
              <p>{particularAssetData.files && particularAssetData.files.map((file, index) => (
    <div key={index}>
      <p>{file.size}</p>
    </div>
  ))}</p>
            </div>
            <hr />
            <div className="assets-popup-format">
              <h1>Geometry:</h1>
              <p>
                {particularAssetData.quads}
                <br />
                {particularAssetData.totaltriangles}
              </p>
            </div>
            <hr />
            <div className="assets-popup-format">
              <h1>Vertices:</h1>
              <p>{particularAssetData.vertices}</p>
            </div>
            <hr />
            <div className="assets-popup-format">
              <h1>UV Layers:</h1>
              <p>Yes</p>
            </div>
            <hr />
            <div className="assets-popup-format">
              <h1>Materials:</h1>
              <p>{particularAssetData.materials}</p>
            </div>
            <hr />
            <div className="assets-popup-format">
              <h1>Rigged:</h1>
              <p>{particularAssetData.rigged}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AssetsPopup;