import React, { useState } from 'react';
import "./adminPurchase.css";
import SideBar from '../../common/sideBar';

const AdminPurchase = () => {
  const dummyData = [
    {
      assetName: "Dog",
      id: "31246",
      purchaseDate: "01/04/2024",
      price: "₹ 300"
    },
    {
      assetName: "Cat",
      id: "78456",
      purchaseDate: "02/04/2024",
      price: "₹ 250"
    },
    {
      assetName: "Bird",
      id: "12389",
      purchaseDate: "03/04/2024",
      price: "₹ 150"
    }
  ];
  const [activeItem, setActiveItem] = useState("purchasehistory");
  const [purchaseData, setPurchaseData] = useState(dummyData);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleIndexClick = (index) => {
    setSelectedData(purchaseData[index]);
    setShowPopup(true);
  };

  
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className='admin-purchase-container'>
      <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
      <div className='admin-purchase-main'>
        <div className='admin-purchase-content'>
          <div className='admin-purchase-content-heading'>
            <h1>Purchase History</h1>
          </div>
          <div className='admin-purchase-content-details'>
            {purchaseData.map((purchase, index) => (
              <div key={index} onClick={() => handleIndexClick(index)}>
                <div className='admin-purchase-content-details-table'>
                  
                    <h1>{index + 1}</h1> {/* Index here */}
                    <div className='admin-purchase-content-details-table-content' >
                      <h1>Asset Name:</h1>
                      <p>{purchase.assetName}</p>
                    </div>
                    <div className='admin-purchase-content-details-table-content'>
                      <h1>ID:</h1>
                      <p>{purchase.id}</p>
                    </div>
                    <div className='admin-purchase-content-details-table-content'>
                      <h1>Purchase Date:</h1>
                      <p>{purchase.purchaseDate}</p>
                    </div>
                    <div className='admin-purchase-content-details-table-content'>
                      <h1>Price</h1>
                      <p>{purchase.price}</p>
                    </div>
                    
                  </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="admin-purchase-popup">
          <div className="admin-purchase-popup-content">
            <span className="admin-purchase-popup-close" onClick={() => setShowPopup(false)}>×</span>
            <h2>Buyer Name:</h2>
            <p>Email Id: </p>
            <p >ID:{selectedData.id}</p>
            <p>Transaction ID:</p>
            <p>Purchase Date: {selectedData.purchaseDate}</p>
            <p>Price: {selectedData.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPurchase;
