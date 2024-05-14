import React, { useState } from 'react';
import './navBar.css';
import search from '../images/icons/01.svg';
import wishlist from '../images/icons/02.svg';
import cart from '../images/icons/03.svg';
import { useFunc} from '../../../redux/user/helperFunctions.js'
import { signInSuccess } from '../../../redux/user/userSlice.js';
 
import { Link, useNavigate , useLocation, useParams } from 'react-router-dom';
import profile from "../image/011.svg";
 
 
 
 
const Nav = () => {
    const location = useLocation();
    const { isLoggedIn, userId } = useFunc();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
   
 
console.log(signInSuccess);
    const routeChange = () => {
        let path = "/login";
        navigate(path);
       
    };
 
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
 
    const isActive = (path) => {
        // If the path is '/landingmain', check if it's the current path
        // or if the current path is the base path '/'.
        if (path === "/landingmain") {
            return location.pathname === path || location.pathname === "/";
        }
        return location.pathname === path;
    };
 
   
    return (
        <div className={`navBar-container ${isOpen ? 'open' : ''}`}>
            <div className='navBar-main'>
            <div className="hamburger-menu" onClick={toggleMenu}>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                </div>
                <div className='navBar-heading'>
                    <h3>Corlmart</h3>
                </div>
                <div className={`navBar-links ${isOpen ? 'open' : ''}`}>
                <Link to="/landingmain">
                        <h3 className={isActive('/landingmain') ? 'active' : ''}>Home</h3>
                    </Link>
                    <Link to="/category">
                        <h3 className={isActive('/category') ? 'active' : ''}>Category</h3>
                    </Link>
                </div>
                <div className={`navBar-icons ${isOpen ? 'open' : ''}`}>
                    <Link to="/search">
                        <img src={search} alt="search" />
                    </Link>
                    <Link to="/wishlist">
                        <img src={wishlist} alt="wishlist" />
                    </Link>
                    {isLoggedIn ? (
                    <Link to="/Cart">
                        <img src={cart} alt="cart" />
                    </Link>
                    ) : (
                        <Link to="/emptyCart">
                            <img src={cart} alt="cart" />
                        </Link>
                    )}
                     
                     {isLoggedIn ? (
                        <Link to={"/profile"}><img src={profile} alt="profile" /></Link>
                    ) : (
                        <button onClick={() => {routeChange() }}>Login</button>
                    )}
                </div>
 
                
            </div>
        </div>
    );
}
 
export default Nav;