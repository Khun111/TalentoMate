import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the provided user ID, email, and password match the predefined fake data
    const fakeUserId = '123';
    const fakeEmail = 'test@example.com';
    const fakePassword = 'password123';

    if (
      formData.userId === fakeUserId &&
      formData.email === fakeEmail &&
      formData.password === fakePassword
    ) {
      console.log('Sign in successful! Redirecting to Dashboard...');

      // Navigate to Dashboard on successful sign-in
      navigate('/dashboard');
    } else {
      console.log('Invalid credentials. Please try again.');
      // Add logic to display an error message for invalid credentials if needed
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h2 className="text-center mb-4">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userId">User ID:</label>
                <input type="text" className="form-control" id="userId" placeholder="Enter User ID" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Login</button>
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

export default SignIn;

