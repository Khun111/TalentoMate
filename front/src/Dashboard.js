import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS for Dashboard
import Logo from './Logo 1.png';
import EmployeeDirectory from './EmployeeDirectory';
import EditUser from './EditUser';
import CreateAttendance from './CreateAttendance';
/* import D3Chart from './D3Chart.js';
import D3ChartLeave from './D3ChartLeave.js';
import JohnDoeImage from './JohnDoe.jpg';
import JaneSmithImage from './JaneSmith.jpg';
import AliceJohnsonImage from './AliceJohnson.jpg';
import BobWilsonImage from './BobWilson.jpg';
import EvaGreenImage from './EvaGreen.jpg'; */

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Dashboard Data
  const [data, setdata] = useState([]);

  useEffect(() => {
    dashData();
  }, []);

  const dashData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/employee");
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
  
  // <Route path="/createAttendance/:id" element={<CreateAttendance />} />

  // Attendance Records
  /* const [attenData, setAttenData] = useState({
    userId: ''
  });

  useEffect(() => {
    attendanceData();
  }, []);

  This API is failing.
  const attendanceData = async () => {
    try {
      data.map((employee) => {

      })
      const response = await axios.get('http://127.0.0.1:5000/attendance')
      setAttenData(response.data)
      console.log('Attendance data', response.data)
    } catch (err) {
      console.log('Attendance error', err)
    }
  }; */

  // Leave Requests
  /* const [leavedata, setLeaveData] = useState([]);

  useEffect(() => {
    leaveDirData();
  }, []);

  const leaveDirData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/leave");
      setLeaveData(response.data)
    } catch (err) {
      console.error(err)
    }
  } */

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  /* const handleAdd = (id, newData, section) => {
    newData.id = section === 'employee-directory' ? employeeData.length + 1 : section === 'attendance-records' ? attendanceData.length + 1 : leaveData.length + 1;
    if (section === 'attendance-records') {
      axios.post("http://127.0.0.1:5000/attendance", { userId: id, status: status })
      setAttendanceData([...attendanceData, newData]);
    }

    if (section === 'employee-directory') {
      setEmployeeData([...employeeData, newData]);
    } else if (section === 'attendance-records') {
      setAttendanceData([...attendanceData, newData]);
    } else if (section === 'leave-requests') {
      setLeaveData([...leaveData, newData]);
    }
  }; */

  const handleDelete = (id, section) => {
    if (section === 'employee-directory') {
      axios.delete(`http://127.0.0.1:5000/employee/${id}`)
      .then((res) => {
        console.log(res.status)
        setEmpData(empData.filter((item) => item.id !== id));
      })
      .catch(err => console.error(err))
    } /* else if (section === 'attendance-records') {
      setAttendanceData(attendanceData.filter((item) => item.id !== id));
    } else if (section === 'leave-requests') {
      setLeaveData(leaveData.filter((item) => item.id !== id));
    } */
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="header">
          <img src={Logo} alt="TalentoMate Logo" className="logo" />
          <div className="search-box">
            <input type="text" placeholder="Search..." className="form-control" />
          </div>
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
              <Link to="/dashboard/attendance" className="nav-link" onClick={() => handleSectionClick('attendance-records')}>
                Attendance Records
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/leave" className="nav-link" onClick={() => handleSectionClick('leave-requests')}>
                Leave Requests
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
              {data.map((item, index) => {
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
                // console.log(item)
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

        {activeSection === 'attendance-records' && (
          <section id="attendance-records">
            <h2>Attendance Records</h2>
            <button /* onClick={() => handleAdd()} */>Add Record</button>
            {/* {attenData.map((item) => (
              <div key={item._id}>
                <p>Status: {item.status}</p>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            ))} */}
          </section>
        )}

        {activeSection === 'leave-requests' && (
          <section id="leave-requests">
            <h2>Leave Requests</h2>
            <Link to={'/leaveRequest'}>
              <button>View Leave Requests</button>
            </Link>
            {/* {leavedata.map((item) => (
              <div className="leave-entry" key={item.id}>
                <strong>{item.name}</strong>
                <p>Start Date: {item.startDate}</p>
                <p>End Date: {item.endDate}</p>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            ))} */}
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
