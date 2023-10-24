// AboutUs.js
import React from 'react';
import './AboutUs.css'; // Import the CSS

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1 className="about-us-heading">About Us</h1>
        <p>
          TalentoMate is a revolutionary Employee Management System designed to simplify your HR processes. 
          Our platform provides a seamless experience to manage employee data, leave requests, performance evaluations, and more.
        </p>
        <p>
          We strive to make HR management efficient and effective, enabling organizations to focus on what matters most—
          their employees and business growth.
        </p>
        <p>Contact us at <strong>info@talentomate.com</strong> for more information.</p>
      </div>
    </div>
  );
};

export default AboutUs;
