import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS for Dashboard
import Logo from './Logo 1.png';


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  // Dashboard Data
  const [data, setdata] = useState([]);

  useEffect(() => {
    dashData();
  }, []);

  const dashData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/employee");
      console.log(response)
      setdata(response.data.users)
      // console.log(response.data.users)
    } catch (err) {
      console.error(err)
    }
  };

  // Employee Directory data
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    empDirData();
  }, []);

  const empDirData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/employee");
      setEmpData(response.data.users)
    } catch (err) {
      console.error(err)
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleDelete = (id, section) => {
    if (section === 'employee-directory') {
      axios.delete(`http://127.0.0.1:5000/employee/${id}`)
      .then((res) => {
        console.log(res.status)
        setEmpData(empData.filter((item) => item.id !== id));
        window.location.reload()
      })
      .catch(err => console.error(err))
    } 
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="header">
          <img src={Logo} alt="TalentoMate Logo" className="logo" />
        </div>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link" onClick={() => handleSectionClick('dashboard')}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/employee" className="nav-link" onClick={() => handleSectionClick('employee-directory')}>
                Employee Directory
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="content">
        {activeSection === 'dashboard' && (
          <section id="dashboard">
            <h2>Welcome to the Dashboard</h2>
            <p>
              You are now in the heart of your HR management. From this dashboard, you can efficiently manage your employee data, attendance records, and leave requests.
            </p>
            <div className="dashboard-content">
              {data.map((item,) => {
                return (
                  <li key={item.id} className="dashboard-box">
                    <strong>Name: {item.name}</strong>
                    <p>Email: {item.email}</p>
                    <p>Job: {item.job}</p>
                  </li>
                )
              })}
            </div>
          </section>
        )}

        {activeSection === 'employee-directory' && (
          <section id="employee-directory">
            <h2>Employee Directory</h2>
            <div className="employee-directory-controls">
              <Link to='/createUser'>
                <button>Create User</button>
              </Link>
              {empData.map((item, index) => {
                return (
                  <li key={item._id} className="dashboard-box">
                    <strong>Name: {item.name}</strong>
                    <p>Email: {item.email}</p>
                    <p>Role: {item.role}</p>
                    <p>Job: {item.job}</p>
                    <p>Id: {item._id}</p>
                    <span>
                      <Link to={`/editUser/${item._id}`}>
                        <button type="button" className="btn btn-primary">Edit</button>
                      </Link>

                      <Link to={`/attendance/${item._id}`}>
                        <button type="button" className="btn btn-primary" onClick={() => handleSectionClick("attendance-records")}>View Attendance</button>
                      </Link>

                      <Link to={`/leaverequest/${item._id}`}>
                        <button type="button" calssName="btn btn-primary">Leave Records</button>
                      </Link>

                      <button type="button" className="btn btn-danger" onClick={() => handleDelete(`${item._id}`, "employee-directory")}>Delete</button>
                    </span>
                  </li>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
