import React from 'react'
import "./contact.css"
import "../privacy policy/privacyPolicy.css"

const Contact = () => {
  return (
    <div className="privacy-policy-container">
    <div className="contact-head">
      <div className="privacy-policy-main">
        <h1>Contact</h1>
        <p>Have a question, comment, or need assistance? We're here to help! Get
         in touch with our dedicated support team for prompt and personalized assistance.</p>
         <p>You can reach us by email at <span className='contact-email'>info@digamend.com</span>. We strive to respond to all inquiries
            within 24 hours, so you can expect a timely and helpful reply to your message.</p>
        <p>For urgent matters or immediate assistance, you can also reach us by phone at
        <span className='contact-email'> +91 9962228323</span>. Our friendly customer service representatives are available during
        our business hours to address your concerns and provide guidance.</p>
        <p>We value your feedback and are committed to continuously improving your experience with
        Corlmart. Whether you have a question about our products, need assistance with an order, 
        or just want to say hello, don't hesitate to reach out. Your satisfaction is our top priority!</p>
        </div>
    </div>
    </div>
  )
}

export default Contact