import React from 'react';
import "./sideBar.css";
import { Link } from 'react-router-dom';

const SideBar = ({ activeItem, setActiveItem }) => {
    const handleItemClick = (itemName = '') => {
        setActiveItem(itemName);   
    };

    return (
        <div className='sidebar-container'>
            <div className="admin-navbar-sidebar">
                <div className='admin-navbar-sidebar-content'>
                 <Link to="/admincategory"> <h1 className={activeItem === 'category' ? 'active' : ''} onClick={() => handleItemClick('category')}>Category</h1></Link>
                 <Link to="/userManagement">  <h1 className={activeItem === 'userManagement' ? 'active' : ''} onClick={() => handleItemClick('userManagement')}>User Management</h1></Link>
                 <Link to="/adminPurchase"> <h1 className={activeItem === 'purchasehistory' ? 'active' : ''} onClick={() => handleItemClick('purchasehistory')}>Purchase History</h1></Link>
                 <Link to="/assetManagement">  <h1 className={activeItem === 'assetmanagement' ? 'active' : ''} onClick={() => handleItemClick('assetmanagement')}>Asset Management</h1></Link>
                </div>
            </div>   
        </div>
    );
}

export default SideBar;




// {activeItem === 'category' && <AdminCategory />}
// {activeItem === 'userManagement' && <AdminUserManage />}
// {activeItem === 'purchasehistory' && <AdminPurchase />}
// {activeItem === 'assetmanagement' && <AssetManagement/>}