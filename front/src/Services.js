// Services.js
import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p>
        At TalentoMate, we provide a range of services designed to simplify your HR processes and improve employee management. Our services are tailored to meet the unique needs of your organization, ensuring a seamless and efficient workflow.
      </p>
      <div className="service-item">
        <h2>Employee Onboarding</h2>
        <p>
          Streamline the onboarding process for new hires with our intuitive platform. Easily manage documentation, training, and orientation to help employees settle into their roles swiftly.
        </p>
      </div>
      <div className="service-item">
        <h2>Performance Evaluation</h2>
        <p>
          Enhance productivity and engagement by conducting regular performance evaluations. Our system provides tools to evaluate employee performance, set goals, and provide constructive feedback.
        </p>
      </div>
      <div className="service-item">
        <h2>Leave Management</h2>
        <p>
          Effortlessly manage employee leave requests, approvals, and balances. Our leave management system ensures accurate tracking and efficient handling of leave-related matters.
        </p>
      </div>
      <div className="service-item">
        <h2>Payroll Processing</h2>
        <p>
          Simplify payroll processing and ensure timely and accurate payments. Our platform automates payroll calculations, tax deductions, and compliance reporting, saving you time and effort.
        </p>
      </div>
    </div>
  );
};

export default Services;
