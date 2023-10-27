// Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-info">
          <div className="contact-info-item">
            <strong>Email:</strong> <a href="mailto:info@example.com" className="contact-link">info@example.com</a>
          </div>
          <div className="contact-info-item">
            <strong>Phone:</strong> <span>(123) 456-7890</span>
          </div>
          <div className="contact-info-item">
            <strong>Address:</strong> <span>1234 Street Name, City, Country</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

