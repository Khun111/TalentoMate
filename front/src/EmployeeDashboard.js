import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeDashboard.css'; // Import the CSS for Dashboard
import Logo from './Logo 1.png';
import D3Chart from './D3Chart.js';
import D3ChartLeave from './D3ChartLeave.js';
import JohnDoeImage from './JohnDoe.jpg';
import JaneSmithImage from './JaneSmith.jpg';
import AliceJohnsonImage from './AliceJohnson.jpg';
import BobWilsonImage from './BobWilson.jpg';
import EvaGreenImage from './EvaGreen.jpg';

const EmployeeDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
 
  const [setEditData] = useState({
    id: null,
    name: '',
    position: '',
    email: '',
  });

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  /* const handleAdd = (newData, section) => {
    newData.id = section === 'attendance-records' ? attendanceData.length + 1 : leaveData.length + 1;

    if (section === 'attendance-records') {
      setAttendanceData([...attendanceData, newData]);
    } else if (section === 'leave-requests') {
      setLeaveData([...leaveData, newData]);
    }
  }; */

  /* const handleDelete = (id, section) => {
    if (section === 'attendance-records') {
      setAttendanceData(attendanceData.filter((item) => item.id !== id));
    } else if (section === 'leave-requests') {
      setLeaveData(leaveData.filter((item) => item.id !== id));
    }
  }; */

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
            <h2>Welcome to the Employee Dashboard</h2>
            <p>
              You are now in the heart of your HR management. From this dashboard, you can efficiently manage your employee data, attendance records, and leave requests.
            </p>
            <div className="dashboard-content">
              {dashboardData.map((item, index) => (
                <div key={index} className="dashboard-box" style={{ backgroundColor: item.color }}>
                  <h3 className="dashboard-label">{item.label}</h3>
                  <p className="dashboard-value">{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'attendance-records' && (
          <section id="attendance-records">
            <h2>Attendance Records</h2>
            <button onClick={() => handleAdd({ name: 'New Record', date: '', hoursWorked: '' }, 'attendance-records')}>
              Add Record
            </button>
            {attendanceData.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={item.name} className="attendance-image" />
                <strong>{item.name}</strong>
                <p>Date: {item.date}</p>
                <p>Hours Worked: {item.hoursWorked}</p>
                <button onClick={() => handleDelete(item.id, 'attendance-records')}>Delete</button>
              </div>
            ))}
            <D3Chart data={fakeAttendanceData} />
          </section>
        )}

        {activeSection === 'leave-requests' && (
          <section id="leave-requests">
            <h2>Leave Requests</h2>
            <button onClick={() => handleAdd({ name: 'New Request', startDate: '', endDate: '' }, 'leave-requests')}>
              Add Request
            </button>
            {leaveData.map((item) => (
              <div className="leave-entry" key={item.id}>
                <img src={item.image} alt={item.name} className="leave-image" />
                <strong>{item.name}</strong>
                <p>Start Date: {item.startDate}</p>
                <p>End Date: {item.endDate}</p>               
                <button onClick={() => handleDelete(item.id, 'leave-requests')}>Delete</button>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
