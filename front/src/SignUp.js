import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './SignIn.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    secretKey: '',
    name: '',
    job: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the provnameed user name, email, and password match the predefined fake data
    const fakeSecretKey = '123';
    const adminData = {
      name: formData.name,
      job: formData.job,
      email: formData.email,
      password: formData.password
    }
    if (formData.secretKey === fakeSecretKey ) {
      axios.post("http://localhost:3001/users", adminData).then(response => console.log(response.data)).catch(error => console.log(error));
      // navigate('/signin');

      // Navigate to Dashboard on successful sign-in
      // navigate('/dashboard');
    } else {
      console.log('Invalname credentials. Please try again.');
      // Add logic to display an error message for invalname credentials if needed
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="secretKey">Admin Id:</label>
                <input type="text" className="form-control" name="secretKey" placeholder="Enter User name" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" name="name" placeholder="Enter Full Name" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="job">Job:</label>
                <input type="text" className="form-control" name="job" placeholder="Enter job position" onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
            <div className="text-center mt-3">
              <a href="https://example.com">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

