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

    try {
      const response = await axios.post("http://127.0.0.1:5000/employee", userData);
      navigate('/dashboard')
      setUserData({ name: '', job: '', email: '', password: '' })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Job</label>
          <input type="text" name="job" value={userData.job} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Create User</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDirectory;
