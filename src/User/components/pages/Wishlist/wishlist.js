import React, { useState } from 'react';
import "./wishlist.css";
import img1 from"../../images/category/fox.svg";
import plus from "../../images/icons/25.svg";
import tick from "../../images/icons/26.svg";
import like from  "../../images/icons/20.svg";
import img3 from "../../images/icons/21.svg";
import unlike from "../../images/icons/24.svg";
import img5 from "../../images/icons/23.svg";
import { useEffect } from 'react';
import { BASE_URL } from '../../../../constant';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Model from '../modelViewer';
import { Link } from 'react-router-dom';
 
 
function WishlistCard({wish}) {
  const [imgSrc, setImgSrc] = useState(like);
  const [imgPlus, setImgPlus]= useState(plus);
  const { currentUser } = useSelector((state) => state.user);
  const prodId= wish.productId
  const userid = currentUser ? currentUser._id : null;
  const [isLiked, setIsLiked] = useState(false);
 
 
 
  console.log(wish);
  console.log(prodId);
 
 
 
  const handleWishlist = async () => {
    const newIsLiked = !isLiked; // Toggle immediately
    setIsLiked(newIsLiked); // Update state immediately
 
    const wishlistInfo = {
      userId: userid,
      productId: prodId,
      isLike: newIsLiked, // Use newIsLiked instead of imgSrc
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
        const data = await res.json(); // Parse response body
        console.log("wishlist response data", data);
        if (newIsLiked)
          {
          // toast("Product added to wishlist", {
          //   icon: "👏",
          //   style: {
          //     borderRadius: "10px",
          //     background: "#333",
          //     color: "#fff",
          //   },
          // });
          setImgSrc(like);
        }
        else
        {
          // toast("Product removed from wishlist", {
          //   icon: "👏",
          //   style: {
          //     borderRadius: "10px",
          //     background: "#333",
          //     color: "#fff",
          //   },
          // });
          setImgSrc(unlike);
        }
      } else {
        const errorData = await res.json(); // Parse error response body
        console.error("wishlist error data", errorData);
        alert(errorData.message); // Display error message
        setIsLiked(!newIsLiked); // Revert state if API call fails
      }
    } catch (error) {
      console.error(error.message);
      // toast.error("Failed to add/remove item to/from wishlist");
      setIsLiked(!newIsLiked); // Revert state if API call fails
    }
  };
 
 
 
// const handleClick = () => {
//     setImgSrc(imgSrc === img2 ? img4 : img2);
//   };
 
const handleClick01 = () => {
    setImgPlus(imgPlus === plus ? tick : plus);
  };
 
 
  const firstFile = wish.productId.files && wish.productId.files.length > 0 ? wish.productId.files[0] : null;
 
   
  return (
    <div className="card-wishlist">
      <div className="box-wishlist">
        <div className='image-wishlist' style={{ height: '230px', width:"100%", background:'white' , borderRadius:"12px", padding:"10px"}}>
        <Link to={`/assetsPopup/${wish.productId._id}`}  >
        {firstFile && <Model widthPercent={100} height={210} modelUrl={firstFile.url} />}
        </Link>
        </div>
        <div className='content-wishlist'>
          <div className='title-wishlist01'>
            <p>{wish.productId.assetName}</p>
            <img src={imgSrc} alt="like" onClick={handleWishlist}/>
          </div>
          <div className='title-wishlist02'>
            <img src={img3} alt="size"/>
            <p>{wish.productId.totalFileSize}</p>
            <img src={img5} alt="price"/>
            <h4>{wish.productId.price}</h4>
          </div>
        </div>
        <div className="icon-wishlist">
          <div className="iconbox-wishlist">
            <img src={imgPlus} alt="Icon" onClick={handleClick01}/>
          </div>
        </div>
      </div>
    </div>
  );
}
 
 
function Wishlist() {
  const { currentUser } = useSelector((state) => state.user);
  const [userWishlist, setUserWishlist] = useState([]);
 
  const id= currentUser._id;
 
 
 
  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const res = await fetch(`${BASE_URL}/wishlist/getParticularLikeProducts?id=${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUserWishlist(data);
          console.log("user wishlist data", data);
        } else {
          throw new Error("Failed to fetch user's wishlist");
        }
      } catch (error) {
        console.error("Error fetching user's wishlist:", error.message);
        // Display error message to the user
      }
    };
   
    fetchUserWishlist();
  }, [id, BASE_URL, currentUser.token, setUserWishlist]);
 
  return (
    <div className="container-wishlist">
      <div className='container-wishlist-heading'>
        <h2>Wishlist</h2>
      </div>
      <div className='container-wishlist-main'>
        {userWishlist.map((wish)=>(<WishlistCard key={wish._id} wish={wish}/>))}
       
      </div>
    </div>
  );
}
 
// {usercart.map((item) => (
//   <CartCard key={item._id} item={item} />
// ))}
 
export default Wishlist;