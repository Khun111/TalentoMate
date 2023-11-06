import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './SignIn.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the provnameed user name, email, and password match the predefined fake data
    const adminData = {
      email: formData.email,
    }
    // console.log(formData.role);
    console.log(adminData);
    
    try {
      const response = await axios.post("http://localhost:5000/forgotPassword", adminData);
      console.log(response);
      navigate('/resetLink');
    } catch (error) {
      console.error(error.response.data);
    }

  //   {
  //     navigate('/signin');

  //     Navigate to Dashboard on successful sign-in
  //     navigate('/dashboard');
  //   } else {
      
  //     Add logic to display an error message for invalname credentials if needed
  //   }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h2 className="text-center mb-4">Forgot Password ?</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
            <div className="text-center mt-3">
              <h3>Verify Your Email</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

