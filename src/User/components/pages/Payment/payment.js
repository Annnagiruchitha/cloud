import React, { useState } from "react";
import "./payment.css";
import profileimg from "../../image/animoji.svg";
import cartimg from "../../images/category/fox.svg";
import rupee from "../../images/icons/23.svg";
import visa from "../../image/Visa.svg";
import mastercard from "../../image/Mastercard.svg";
import discover from "../../image/Discover.svg";
import amex from "../../image/Amex.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const Payment = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasPurchased, setHasPurchased] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/razorpay";
    navigate(path);
  };

  const handlePurchase = () => {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const addressLine1 = document.getElementById("addressLine1").value.trim();
    const addressLine2 = document.getElementById("addressLine2").value.trim();
    const country = document.getElementById("country").value.trim();
    const region = document.getElementById("region").value.trim();
    const city = document.getElementById("city").value.trim();
    const zipcode = document.getElementById("zipcode").value.trim();
    if (
      firstName &&
      lastName &&
      addressLine1 &&
      addressLine2 &&
      country &&
      region &&
      city &&
      zipcode
    ) {
      // Your purchase logic here
      console.log("Purchase successful!");
      setHasPurchased(true);
      setCurrentStep(2);
    } else {
      // Alert user to fill in all fields
      toast.error("Please fill in all fields.");
    }
  };

  const handleGuestBuyNow = () => {
    const name = document.getElementById("name").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    if (name && phoneNumber) {
      console.log("Buying now...");
      setHasPurchased(true);
      setCurrentStep(2);
      handleClosePopup();
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="payment-container">
      <div className={`payment-main ${isPopupOpen ? "blur-background" : ""}`}>
        <div className="payment-section1">
          <div className="payment-section1-div1">
            <div
              className={`indicator-number ${
                currentStep === 1 ? "active-indicator" : ""
              }`}
            >
              1
            </div>
            <div className="indicator-text">Billing Address</div>
          </div>
          <hr />
          <div className="payment-section1-div1">
            <div
              className={`indicator-number ${
                currentStep === 2 ? "active-indicator" : ""
              }`}
            >
              2
            </div>
            <div className="indicator-text">Payment</div>
          </div>
        </div>

        {hasPurchased ? (
          <div className="account-details-main">
            <div className="account-details-section1">
              <div className="account-details-section1-div1">
                <h1>Account</h1>
                <hr />
                <div className="account-details-img">
                  <img src={profileimg} />
                  <h2>Arshitha</h2>
                </div>
              </div>
              <div className="account-details-section1-div2">
                <div className="account-shopping-cart">
                  <h1>Shopping Cart</h1>
                  <p>Edit</p>
                </div>
                <hr />
                <div className="account-shopping-details">
                  <div className="account-shopping-img">
                    <img src={cartimg} />
                    <h1>fox</h1>
                  </div>
                  <div className="account-shopping-value">
                    <img src={rupee} alt="Rupee Symbol" />
                    <h1>390</h1>
                  </div>
                </div>
              </div>
              <div className="account-details-section1-div3">
                <div className="account-details-cart">
                  <h1>Shopping Cart</h1>
                  <p>Edit</p>
                </div>
                <hr />
                <div className="account-details-address">
                  <p>Arshitha Pradeep</p>
                  <p>xxxxxxxxxxxxxxxx</p>
                  <p>xxxxxxxxxxxxxxxxxxxxxx</p>
                  <p>xxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                </div>
              </div>
            </div>
            <div className="account-details-section2">
              <div className="account-details-section2-heading">
                <h1>Account</h1>
              </div>
              <hr />
              <div className="account-details-section2-main">
                <div className="account-details-subtotal">
                  <p>Subtotal</p>
                  <p>₹ 390</p>
                </div>
                <hr />
                <div className="account-details-taxes">
                  <p>Taxes</p>
                  <p>₹ 0.00</p>
                </div>
                <hr />
                <div className="account-details-total">
                  <p>Total</p>
                  <p>₹ 390</p>
                </div>
                <div className="account-details-paynow">
                  <button onClick={routeChange} className="account-details-button">Pay Now</button>
                </div>
                <div className="account-details-card">
                  <img src={visa} />
                  <img src={mastercard} />
                  <img src={discover} />
                  <img src={amex} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="payment-section2">
              {/* <div className="payment-section2-div1">
                <button className="payment-button" onClick={handleOpenPopup}>
                  Buy as Guest
                </button>
              </div> */}
              <div className="payment-section2-div2">
                <div className="billing-form-heading">
                  <h1>Billing Address</h1>
                  <hr />
                </div>
                <div className="billing-form-content">
                  <div className="billing-row">
                    <div className="billing-form-group">
                      <label htmlFor="firstName" className="bill-form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="bill-input"
                        required
                      />
                    </div>

                    <div className="billing-form-group">
                      <label htmlFor="lastName" className="bill-form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="bill-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="billing-form-group">
                    <label htmlFor="addressLine1" className="bill-form-label">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      className="bill-input"
                      required
                    />
                  </div>

                  <div className="billing-form-group">
                    <label htmlFor="addressLine2" className="bill-form-label">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      className="bill-input"
                      required
                    />
                  </div>

                  <div className="billing-row">
                    <div className="billing-form-group">
                      <label htmlFor="country" className="bill-form-label">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="bill-input-select"
                        required
                      >
                        <option className="bill-input" value="">
                          Select Country
                        </option>
                        <option className="bill-input" value="US">
                          United States
                        </option>
                        <option className="bill-input" value="IN">
                          India
                        </option>
                        <option className="bill-input" value="CA">
                          Canada
                        </option>
                        <option className="bill-input" value="UK">
                          United Kingdom
                        </option>
                        <option className="bill-input" value="AU">
                          Australia
                        </option>
                      </select>
                    </div>

                    <div className="billing-form-group">
                      <label htmlFor="region" className="bill-form-label">
                        Region/Province
                      </label>
                      <input
                        type="text"
                        id="region"
                        name="region"
                        className="bill-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="billing-row">
                    <div className="billing-form-group">
                      <label htmlFor="city" className="bill-form-label">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="bill-input"
                        required
                      />
                    </div>

                    <div className="billing-form-group">
                      <label htmlFor="zipcode" className="bill-form-label">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        className="bill-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="billing-form-button">
                    <button
                      type="button"
                      className="billing-button"
                      onClick={handlePurchase}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {isPopupOpen && (
        <div className="billing-popup">
          <div className="billing-popup-content">
            {/* Close button */}
            <button className="billing-close-button" onClick={handleClosePopup}>
              &times;
            </button>
            {/* Form */}
            <form className="billing-popup-form">
              <div className="billing-popup-form-group">
                <label htmlFor="name" className="bill-popup-form-label">
                  Name
                </label>
                <input type="text" id="name" className="bill-input" required />
              </div>
              <div className="billing-popup-form-group">
                <label htmlFor="phoneNumber" className="bill-popup-form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="bill-input"
                  required
                />
              </div>
              {/* Buy Now button */}
              <button
                type="button"
                className="billing-popup-button"
                onClick={handleGuestBuyNow}
              >
                Buy Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
