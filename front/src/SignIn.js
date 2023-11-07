import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './SignIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [user, setUser] = useState({})
  useEffect(() => {
    axios.get("http://localhost:5000/employee").then(response => console.log(response.data)).catch(error => console.log(error));
  }, [])
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
      password: formData.password,
      role: formData.role
    }
    // console.log(formData.role);
    console.log(adminData);
    
    try {
      const response = await axios.post("http://localhost:5000/login", adminData);
      setUser(response.data.user)
      console.log(user._id);
      if (user.role === "admin") {
      navigate('/dashboard');
      }
      if (user.role === "employee") {
        navigate(`/empDashboard/${user._id}`)
      }
      console.log(response);
    } catch (error) {
      console.error(error.response);
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
            <h2 className="text-center mb-4">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <select name="role" onChange={handleChange} required>
                  <option selected disabled>Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Sign In</button>
            </form>
            <div className="text-center mt-3">
              <Link to={'/forgotPassword'}>
                <button type="submit" >Forgot Password?</button>
              </Link>
              <a href="https://example.com"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

