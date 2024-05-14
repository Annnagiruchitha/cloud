import React from "react";
import "../privacy policy/privacyPolicy.css";
import "./aboutUs.css"

const AboutUs = () => {
  return (
    <div className="privacy-policy-container">
      <div className="aboutus-head">
        <div className="privacy-policy-main">
            <h1>About Us</h1>
            <p>At Corlmart, we are passionate about making 3D modeling accessible to everyone,
            whether you're a seasoned professional or just starting out. Our mission is simple: 
            to provide a vast selection of top-notch 3D models while keeping costs affordable for our customers.</p>

            <p>What sets us apart is our dedication to quality and affordability. We work closely with
            talented artists and designers from around the globe to curate a diverse collection of
            3D models spanning various categories, including animals, characters, vehicles, props,
            and more. Each model undergoes rigorous quality checks to ensure it meets our high standards 
            before it's made available to you.</p>

            <p>Thank you for choosing Corlmart as your trusted source for affordable 3D models. We look 
            forward to helping you bring your ideas to life!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
