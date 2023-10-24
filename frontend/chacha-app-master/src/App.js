import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Landingpage';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import AboutUs from './AboutUs';
import Services from './Services';
import Contact from './Contact';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default App;






