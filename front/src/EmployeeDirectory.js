// EmployeeDirectory.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDirectory = () => {
  const [ userData, setUserData] = useState({
    name: '',
    job: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await axios.post("http://127.0.0.1:5000/employee", userData);
      console.log(response)
      navigate('/dashboard')
      setUserData({ name: '', job: '', email: '', password: '' })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h2 className="text-center mb-4">Create Employee</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Job</label>
          <input type="text" name="job" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block mx-auto">Create Employee</button>
        </div>
      </form>
            <div className="text-center mt-3">
            </div>
          </div>
        </div>
      </div>
    </div>
      <h2>Create User</h2>
      
    </div>
  );
};

export default EmployeeDirectory;
