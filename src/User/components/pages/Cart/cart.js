import React, { useEffect, useState } from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import img1 from "../../image/fox.svg";
import img2 from "../../image/010.svg";
import img4 from "../../image/011 (1).svg";
import img5 from "../../image/007.svg";
import img6 from "../../image/009.svg";
import { BASE_URL } from "../../../../constant";
import { toast } from "react-toastify";
import Model from "../modelViewer";
import { Link } from "react-router-dom";
 
function CartCard({ item }) {
  // Pass 'item' as a prop to get details of the product
  const { currentUser } = useSelector((state) => state.user);
  const [imgSrc, setImgSrc] = useState(img2);
 
  const handleClick = () => {
    setImgSrc(imgSrc === img4 ? img2 : img4);
  };
 
  const removeItem = async () => {
    console.log(item);
    const productId = item.productId; // Get the productId from the 'item' prop
    console.log("prodId", productId);
    try {
      const deleteRes = await fetch(`${BASE_URL}/cart/RemoveItemFromCart`, {
        // Corrected endpoint name
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      console.log("productIdd", productId);
 
      console.log(deleteRes);
      window.location.reload();
      // Optionally, you can update the cart after successful removal
      // } else {
      //     throw new Error('Failed to delete item from cart');
      // }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update cart");
    }
  };
 
  const firstFile =
    item.productId.files && item.productId.files.length > 0
      ? item.productId.files[0]
      : null;
 
  return (
    <div className="card-cart">
      <div className="card-cart-main">
        <div className="card-cart-main-content">
          <div
            className="image-cart"
            style={{
              height: "140px",
              width: "100%",
              background: "white",
              borderRadius: "12px",
            }}
          >
            <Link to={`/assetsPopup/${item.productId._id}`}>
              {firstFile && (
                <Model
                  widthPercent={300}
                  height={130}
                  modelUrl={firstFile.url}
                />
              )}
            </Link>
          </div>
          <div className="content-cart">
            <div className="title-cart01">
              <p>{item.productId.assetName}</p>
            </div>
            <div className="title-cart02">
              <p>Format:</p>
              <h3>{item.productId.fileFormats}</h3>
            </div>
            <div className="title-cart03">
              <h2>$</h2>
              <h3>{item.productId.price}</h3>
            </div>
            <div className="title-cart04">
              <img src={imgSrc} alt="fav" onClick={handleClick} />
              <p onClick={removeItem}>Remove</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
 
function OrderCard({ usercart }) {
  if (!Array.isArray(usercart) || usercart.length === 0) {
    return <div className="order-cart">Your cart is empty.</div>;
  }
 
  // Compute total value
  const totalValue = usercart.reduce((total, item) => {
    // Convert price to number before adding to total
    const price = parseFloat(item.productId.price) || 0;
    return total + price;
  }, 0);
 
  // Log totalValue to check its value
  console.log("totalValue:", totalValue);
  return (
    <div className="order-cart">
      <div className="order-item01">
        <h4>Order Value</h4>
        <p>₹ {totalValue.toFixed(2)}</p>
      </div>
      <hr />
      <div className="order-item02">
        <h4>Total</h4>
        <p>₹ {totalValue.toFixed(2)}</p>
      </div>
      <div className="checkout">
        <p>Continue to Checkout</p>
      </div>
    </div>
  );
}
 
function CartList() {
  const { currentUser } = useSelector((state) => state.user);
  const [usercart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/cart/getUserCart?userId=${currentUser._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUserCart(data);
          console.log(data);
        } else {
          throw new Error("Failed to fetch user's cart");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
 
    fetchUserCart();
  }, []);
  const totalProductIdsCount = usercart.length;
 
  return (
    <div className="container-cart">
      <div className="main-cart">
        <h5>My Cart ({totalProductIdsCount})</h5>
        <div className="container-cart-main">
          <div className="container-cart-main01">
            {usercart.map((item) => (
              <CartCard key={item._id} item={item} />
            ))}
          </div>
          <div className="container-cart-main02">
            <OrderCard usercart={usercart} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CartList;