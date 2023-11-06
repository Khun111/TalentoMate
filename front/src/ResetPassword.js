import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './SignIn.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
  });
  const { token } = useParams();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the provnameed user name, password, and password match the predefined fake data
    const adminData = {
      password: formData.password,
    }
    // console.log(formData.role);
    console.log(adminData);
    
    try {
      const response = await axios.post(`http://localhost:5000/resetPassword/${token}`, adminData);
      console.log(response);
      navigate('/resetSuccess');
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
            <h2 className="text-center mb-4">Reset Password ?</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">New Password:</label>
                <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
            </form>
            <div className="text-center mt-3">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

