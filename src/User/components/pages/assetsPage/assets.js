import React, { useEffect, useState, useRef } from "react";
import "./assets.css";
import search from "../../images/icons/01.svg";
import fox from "../../images/category/fox.svg";
import like from "../../images/icons/20.svg";
import unlike from "../../images/icons/24.svg";
import plus from "../../images/icons/25.svg";
import tick from "../../images/icons/26.svg";
import download from "../../images/icons/21.svg";
import rupee from "../../images/icons/23.svg";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../constant";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import hamburgerIcon from "../../images/icons/hamburgerIcon.svg"
import ModelViewer from "../modelViewer";
import Dinosaur from "../modelViewer";
import Model from "../modelViewer";

 



const AssetsCard = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgSrc, setImgSrc] = useState(unlike);
  const [imgPlus, setImgPlus] = useState(() => {
    // Check if the value is already stored in localStorage
    const storedImgPlus = localStorage.getItem('');
    // Return the stored value if it exists, otherwise return the default value
    return storedImgPlus ? storedImgPlus : plus;
  });
  const [cart, setCart] = useState();
  const { categoryId } = useParams();
  const userid = currentUser ? currentUser._id : null; // Add a null check
  const prodId = data ? data._id : null; 
  const [cartCount, setCartCount] = useState(0)
  const gltf = useRef();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [gltfModel, setGltfModel] = useState(null);

  useEffect(() => {
    if (!currentUser || !data) return; // Exit early if currentUser or data is null

    console.log("userId", userid);
    console.log("productId", prodId);

    // Your other code here...

  }, [currentUser, data]); 


  const handleClick = () => {
    setImgSrc(imgSrc === unlike ? like : unlike);
  };
  // const handleClick01=()=>{
  //     {CartList.includes()}
  // }
  console.log("dataaaa", data);

  // const handleClick01 = () => {
  //     setImgPlus(imgPlus === plus ? tick : plus);
  // };

  const cartinfo = {
    userId: userid,
    productId: prodId,
  };

 

  const handleWishlist = async () => {
    const wishlistInfo = {
      userId: userid,
      productId: data._id,
      isLike: imgSrc === unlike ? true : false,
    };
 
    try {
      console.log("wishlistInfo", wishlistInfo);
      const res = await fetch(`${BASE_URL}/wishlist/likeProduct`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistInfo),
      });
      console.log("response wishlist", res);
 
      if (res.ok) {
        const responseData = await res.json();
        if (
          responseData.message === "whisList Created" ||
          responseData.message === "whishList Removed"
        ) {
          console.log("Response data:", responseData);
          setImgSrc(like);
          //   toast.success(responseData.message);
          toast(responseData.message, {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          throw new Error(responseData.message);
        }
      } else {
        throw new Error("Failed to add/remove item to/from wishlist");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to add/remove item to/from wishlist");
    }
  };
  console.log(imgPlus);
 
  useEffect(() => {
    localStorage.setItem('imgPlus', imgPlus);
  }, [imgPlus]);
 
  const handleCart = async () => {
    try {
      if (!currentUser) {
        // Handle the scenario where the user is not logged in
        toast("Please login to add items to cart", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      }
      if (imgPlus === tick) {
        const productId = prodId;
        console.log(prodId);
        const deleteRes = await fetch(`${BASE_URL}/cart/RemoveItemFromCart`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }), // Wrap productId in an object
        });
 
        if (deleteRes.ok) {
        //   alert("Item removed from cart successfully");
        toast("Item removed from cart successfully", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setImgPlus(plus); // Change the icon back to plus
          setCartCount(cartCount - 1);
          console.log(cartCount);
        } else {
          throw new Error("Failed to delete item from cart");
        }
      } else {
        const res = await fetch(`${BASE_URL}/cart/createCart`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartinfo),
        });
 
        if (res.ok) {
          const data = await res.json();
        //   alert(data.message);
        toast(data.message, {
            icon: "👏",
            style: {
              borderRadius: "5px",
              background: "#333",
              color: "#fff",
            },
          });
          setCart(data); // Assuming data contains cart information
          setImgPlus(tick);
          setCartCount(cartCount + 1);
          console.log(cartCount);
        } else {
          throw new Error("Failed to add item to cart");
        }
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update cart");
    }
  };
  


  const firstFile = data.files && data.files.length > 0 ? data.files[0] : null;



  return (
    <div className="card-assets">
      <div className="box-assets">
      
      <div className="image-assets"style={{ height: '230px', width:"100%", background:'white'}}>
     
     <Link to={`/assetsPopup/${data._id}`}  >
     {firstFile && <Model widthPercent={100} height={230} modelUrl={firstFile.url} />}
     </Link>
        
        </div>
        <div className="content-assets">
          <div className="title-assets01">
            <p>{data.assetName}</p>
            <img src={imgSrc} alt="Like" onClick={handleWishlist} />
          </div>
          <div className="title-assets02">
            <img src={download} alt="Download" />
            <p>
              {data.files && data.files.length > 0 ? data.files[0].size : "N/A"}
            </p>
            <img src={rupee} alt="Rupee" />
            <h4>{data.price}</h4>
          </div>
        </div>
        <div className="icon-assets">
          <div className="iconbox-assets">
            <img src={imgPlus} onClick={handleCart} alt="Plus" />
          </div>
        </div>
       
      </div>
    </div>
  );
};

function Assets() {
  const { categoryId } = useParams();
  const [assetData, setAssetData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSort, setSelectedSort] = useState("Sort");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedFormat, setSelectedFormat] = useState("Format");
  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [range, setRange] = useState([0, 1000]);
  const [filteredData, setFilteredData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  function handleChanges(event, newValue) {
    setRange(newValue);
  }

  console.log("categoryid:", categoryId);
  useEffect(() => {
    // Fetch category data from the backend
    axios
      .get(`${BASE_URL}/asset/getByCategory/${categoryId}`)
      .then((response) => {
        console.log(response);
        // Access the array of categories from the response data
        const assetdata = response.data.assets;
        setAssetData(assetdata);
        console.log("data", assetdata);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);

  useEffect(() => {
    let filtered = assetData.filter(
      (asset) =>
        asset.assetName.toLowerCase().includes(searchValue.toLowerCase()) &&
        (selectedCategory === "Category" ||
          asset.category === selectedCategory) &&
        (selectedFormat === "Format" || asset.format === selectedFormat) &&
        (!isFreeOnly || asset.price === 0) &&
        asset.price >= range[0] &&
        asset.price <= range[1]
    );
    if (selectedSort === "Popular") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (selectedSort === "Newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selectedSort === "Low Price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "High Price") {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredData(filtered);
  }, [
    searchValue,
    assetData,
    selectedCategory,
    selectedFormat,
    isFreeOnly,
    range,
    selectedSort,
  ]);

  const handleClear = () => {
    // Reset form data
    setRange([5, 100]);
    setSearchValue("");
    setSelectedSort("Sort");
    setSelectedCategory("Category");
    setSelectedFormat("Format");
    setIsFreeOnly(false);
  };


  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };



  return (
    <div className="container-assets">
      <div className="assets-main">
        <h2 className="assets-heading">
          {/* {data.category[0].categoryName} 3D Models */}
        </h2>
        <form>
          <div className="assets-filter">
            <div className="assets-search">
              <span className="assets-search-icon">
                <img src={search} alt="Search" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="assets-search-border"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <div className="hamburger-icon" onClick={toggleFilters}>
              <img src={hamburgerIcon} alt="Filter" />
            </div>

            {/* Filters - Only visible in responsive */}
            <div className={`filters-dropdown ${showFilters ? 'show' : ''}`}>
              {/* Select for sorting */}
              <div class="select-wrapper">
              <select
                className=" p-2.5 text-white bg-black border rounded-md shadow-sm outline-none appearance-none border-orange-400"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="Sort" defaultValue>
                  Sort
                </option>
                <option>Popular</option>
                <option>Newest</option>
                <option>Low Price</option>
                <option>High Price</option>
              </select>
              <div class="custom-arrow">
                <span>&#9660;</span>
              </div>
              </div>

              
              <div className="asset-page-filter-price-range">
              <Typography color="white" id="range-slider-left">
                {range[0]}
              </Typography>
              <Slider
                value={range}
                onChange={(event, newValue) => setRange(newValue)}
                valueLabelDisplay="auto"
                color="orange"
              />
              <Typography color="white" id="range-slider-left">
                {range[1]}
              </Typography>
              </div>

              <div class="select-wrapper">
              <select
                className="p-2.5 text-white bg-black border rounded-md shadow-sm outline-none appearance-none border-orange-400"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Category" defaultValue>
                  Category
                </option>
                <option value="Animals & Pets">Animals & Pets</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
              </select>
              <div class="custom-arrow">
                <span>&#9660;</span>
              </div>
            </div>

              <div class="select-wrapper">
              <select
                className="p-2.5 text-white bg-black border rounded-md shadow-sm outline-none appearance-none border-orange-400 "
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                <option value="Format" defaultValue>
                  Format
                </option>
                <option value=".glb/.gltf">.glb/.gltf</option>
                <option value=".flx">.flx</option>
                <option value=".obj">.obj</option>
                <option value=".blend">.blend</option>
              </select>
              <div class="custom-arrow">
                <span>&#9660;</span>
              </div>
            </div>


              <div className="asset-page-filter">
              <input
                type="checkbox"
                className="asset-page-filter"
                checked={isFreeOnly}
                onChange={(e) => setIsFreeOnly(e.target.checked)}
              />
              <label for="checkbox">Free</label>
              </div>

              <h4 onClick={handleClear}> <span style={{color:"black" , textDecoration:"underline"}}>Clear</span></h4>
            </div>


<div className="filters-hambergar">
            <div class="select-wrapper">
              <select
                className=" p-2.5 text-white bg-black border rounded-md shadow-sm outline-none appearance-none border-orange-400"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="Sort" defaultValue>
                  Sort
                </option>
                <option>Popular</option>
                <option>Newest</option>
                <option>Low Price</option>
                <option>High Price</option>
              </select>
              <div class="custom-arrow">
                <span>&#9660;</span>
              </div>
            </div>

            <div className="asset-page-filter-price-range">
              <Typography color="white" id="range-slider-left">
                {range[0]}
              </Typography>
              <Slider
                value={range}
                onChange={(event, newValue) => setRange(newValue)}
                valueLabelDisplay="auto"
                color="orange"
              />
              <Typography color="white" id="range-slider-left">
                {range[1]}
              </Typography>
            </div>
            <div class="select-wrapper">
              <select
                className="p-2.5 text-white bg-black border rounded-md shadow-sm outline-none appearance-none border-orange-400"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Category" defaultValue>
                  Category
                </option>
                <option value="Animals & Pets">Animals & Pets</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
              </select>
              <div class="custom-arrow">
                <span>&#9660;</span>
              </div>
            </div>

            <div class="select-wrapper">
              <select
               className="p-2.5 text-white bg-black border rounded-md shadow-sm outline-none appearance-none border-orange-400"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                <option value="Format" defaultValue>
                  Format
                </option>
                <option value=".glb/.gltf">.glb/.gltf</option>
                <option value=".flx">.flx</option>
                <option value=".obj">.obj</option>
                <option value=".blend">.blend</option>
              </select>
              <div class="custom-arrow">
                <span>&#9660;</span>
              </div>
            </div>

            <div className="asset-page-filter">
              <input
                type="checkbox"
                className="asset-page-filter"
                checked={isFreeOnly}
                onChange={(e) => setIsFreeOnly(e.target.checked)}
              />
              <label for="checkbox">Free</label>
            </div>
            <h4 onClick={handleClear}>Clear</h4>
          </div>
          </div>
        </form>
      </div>
      <div className={`assets-main-container ${showFilters ? 'blur' : ''}`}>
      {filteredData.map((asset, index) => (
          <AssetsCard key={index} data={asset} />
        ))}
      </div>
    </div>
  );
}

export default Assets;
