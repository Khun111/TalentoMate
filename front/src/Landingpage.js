// LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo 1.png';
import BackgroundImage from './background3.jpg';
import './index.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log('Sign In button clicked.');
    // Navigate to SignIn page
    navigate('/signin');
  };

  const handleAboutUs = () => {
    console.log('About Us button clicked.');
    // Navigate to AboutUs page
    navigate('/aboutus');
  };

  const handleServices = () => {
    console.log('Services button clicked.');
    // Navigate to Services page
    navigate('/services');
  };

  const handleContact = () => {
    console.log('Contact button clicked.');
    // Navigate to Contact page
    navigate('/contact');
  };

  const landingPageStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
  };

  return (
    <div className="landing-page" style={landingPageStyle}>
      <nav>
        <ul className="nav-links">
          <li><button onClick={handleAboutUs}>About Us</button></li>
          <li><button onClick={handleServices}>Services</button></li>
          <li><button onClick={handleContact}>Contact</button></li>
        </ul>
      </nav>

      <div className="logo">
        <img src={Logo} alt="TalentoMate Logo" />
      </div>
      
      <header>
        <div className="description">
          <h1>Welcome to TalentoMate</h1>
          <p>An Employee Management System that simplifies your HR processes.</p>
        </div>
        <div className="cta-buttons">
          <button className="sign-in button" onClick={handleSignIn}>Sign In </button>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
