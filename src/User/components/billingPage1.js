import React, { useState } from "react";
// import "./BillingPage1.css";
 
function BillingPage1() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
 
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
 
  const handleBuyNow = () => {
    // Logic to handle buying now
    console.log("Buying now...");
    // For demo, closing the popup
    handleClosePopup();
  };
 
  return (
    <div className="Billing-main">
      {/* Navigation indicator */}
 
      <div className="navigation-indicator">
        <div className="indicator-circle active">
          <div className="indicator-number">1</div>
          <div className="indicator-text">Billing Address</div>
        </div>
        <hr className="indicator-line" />
        <div className="indicator-circle border-circle">
          <div className="indicator-number">2</div>
          <div className="indicator-text">Payment</div>
        </div>
      </div>
 
      <button
        type="button"
        className="buy-as-guest-button"
        onClick={handleOpenPopup}
      >
        Buy as Guest
      </button>
      <div className="billing-form">
        <div className="form-heading">
          <h2>Billing Address</h2>
          <hr />
        </div>
 
        <div className="form-content">
          <div className="row">
            <div className="form-group">
              <label htmlFor="firstName" className="bill-form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="bill-input"
              />
            </div>
 
            <div className="form-group">
              <label htmlFor="lastName" className="bill-form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="bill-input"
              />
            </div>
          </div>
 
          <div className="form-group">
            <label htmlFor="addressLine1" className="bill-form-label">
              Address Line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              className="bill-input"
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="addressLine2" className="bill-form-label">
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              className="bill-input"
            />
          </div>
 
          <div className="billing-row">
            <div className="form-group">    
              <label htmlFor="country" className="bill-form-label">
                Country
              </label>
              <select id="country" name="country">
                <option value="">Select Country</option>
                {/* Add options for countries */}
              </select>
            </div>
 
            <div className="form-group">
              <label htmlFor="region" className="bill-form-label">
                Region/Province
              </label>
              <input
                type="text"
                id="region"
                name="region"
                className="bill-input"
              />
            </div>
          </div>
 
          <div className="row">
            <div className="form-group">
              <label htmlFor="city" className="bill-form-label">
                City
              </label>
              <input type="text" id="city" name="city" className="bill-input" />
            </div>
 
            <div className="form-group">
              <label htmlFor="zipcode" className="bill-form-label">
                Zip Code
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                className="bill-input"
              />
            </div>
          </div>
 
          <div className="form-group">
            <button type="button" className="buy-now-button">
              Buy Now
            </button>
          </div>
        </div>
      </div>
 
      {/* Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            {/* Close button */}
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            {/* Form */}
            <form>
              <div className="popup-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="popup-form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              {/* Buy Now button */}
              <button
                type="button"
                className="popup-button"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default BillingPage1;