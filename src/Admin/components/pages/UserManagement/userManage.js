import React, { useEffect, useState } from 'react';
import "./userManage.css";
import { Link } from "react-router-dom";
import SideBar from '../../common/sideBar';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../../constant';
 
const AdminUserManage = () => {
    const [activeItem, setActiveItem] = useState('userManagement');
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${BASE_URL}/user/getusers`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${currentUser.token}` // Include user token for authentication
                    },
                  });  
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    setUsers(data.users);
                } else {
                    throw new Error('Failed to fetch users');
                }
            } catch (error) {
                console.error(error.message);
                // Handle error, show message to user, etc.
            }
        };
       
        if (currentUser && currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser]); // Include currentUser in dependency array
 
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
 
    return (
        <div className='user-manage-container'>
            <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
            <div className='user-manage-main'>
                <div className='user-manage-content'>
                    <h2>User Management</h2>
 
                    <div className='user-manage-content-users'>
                        <div className='user-manage-content-users-heading'>
                            <h1>SL.No</h1>
                            <h1>User Name</h1>
                            <h1>Email ID</h1>
                            <h1>Phone Number</h1>
                        </div>
                        {/* Render fetched users */}
                        {users.map((user, index) => (
                            <Link to={`/userProfile/${user._id}`} key={user._id}>
                                <div className='user-manage-content-users-details'>
                                    <h1>{index + 1}</h1>
                                    <h1>{user.name}</h1>
                                    <h1>{user.email}</h1>
                                    <h1>{user.phone}</h1>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AdminUserManage;