import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"
import corllel from "../images/icons/14.svg"
import insta from "../images/icons/15.svg"
import twitter from "../images/icons/16.svg"
import linkdin from "../images/icons/17.svg"
import youtube from "../images/icons/18.svg"
import speaker from "../images/icons/19.svg"


const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-main'>
                {/* <div className='footer-section1'>
                    <div className='footer-heading'>
                        <img src={corllel} />
                        <h1>Corllel</h1></div>
                    <div className='footer-icons'>
                        <img src={insta} />
                        <img src={twitter} />
                        <img src={linkdin} />
                        <img src={youtube} />
                    </div>
                </div> */}
                <div className="footer-section2">
                    <h3>About</h3>
                    <Link to={"/aboutUs"}><p>About Us</p></Link>
                    <Link to={"/contact"}><p>Contact</p></Link>
                    <h3>Company</h3>
                    <Link to={"/privacyPolicy"}><p>Privacy Policy</p></Link>
                    <Link to={"/termsConditions"}><p>Terms & Conditions</p></Link>
                    <Link to={"/cancellationPolicy"}><p>Refund & Cancellation Policy</p></Link>
                </div>

                <div className='footer-section3'>
                    <h3>Contact Us</h3>
                    <h4>Headquarters Address</h4>
                    <p>38, Gnanandha Nagar Main Road,</p>
                    <p>Madambakkam,</p>
                    <p>Chennai - 600 126</p>
                </div>

                <div className='footer-section4'>
                <h3>Office Address</h3>
                <h4>A3, Ponniamman 2nd Cross Street</h4>
                    <p>Madipakkam,</p>
                    <p>Chennai - 600 091</p>

                </div>

                <div className='footer-section5'>
                   <div className='footer-request'>
                    <h3>Request-</h3>
                    <h4>info@digamend.com</h4>
                    </div>
                    <p>+91 9962228323</p>
                    <p>+91 9962229323</p>

                </div>
            
            </div>
            <hr/>
            <div className='footer-bottom'>
            <div className='footer-heading'>
                        <img src={corllel} />
                       </div>
           <div className='copyright'>
            
            <p>Copyright © 2024 corlmart. All Rights Reserved.</p>
           </div>
           <div className='footer-icons'>
                        <img src={insta} />
                        <img src={twitter} />
                        <img src={linkdin} />
                        <img src={youtube} />
                    </div>
                    </div>


        </div>
    )
}

export default Footer