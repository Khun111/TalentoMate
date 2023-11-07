import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
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
  const { id } = useParams();

  // Dashboard Data
  const [data, setdata] = useState([]);
  // const [attenData, setAttenData] = useState([])

  useEffect(() => {
    dashData();
  }, []);

  const dashData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/employee/${id}`);
      setdata(response.data.user)
       console.log(response.data.user)
    } catch (err) {
      console.error(err)
    }
  };
//   const attendanceData = async () => {
//     try {
//         const response = await axios.get(`http://127.0.0.1:5000/attendance/${id}`)
//         setAttenData(response.data.attendance)
//         console.log('Attendance data', response.data.attendance)
//     } catch (err) {
//         console.log('Attendance error', err)
//     }
// };
  

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
              <Link to={`/empDashboard/${id}`} className="nav-link">
                Dashboard
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to={`/dashboard/attendance/${id}`} className="nav-link" onClick={() => handleSectionClick('attendance-records')}>
                Attendance Records
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/leave" className="nav-link" onClick={() => handleSectionClick('leave-requests')}>
                Leave Requests
              </Link>
            </li> */}
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
              Welcome {data.name}. Here are your details.
            </p>
            <div className="dashboard-content">
                    <strong>Name: {data.name}</strong>
                    <p>Email: {data.email}</p>
                    <p>Job: {data.job}</p>
            </div>
          </section>
        )}

        
        {/* {activeSection === 'attendance-records' && (
          <section id="attendance-records">
            <h2>Attendance Records</h2>
            <button onClick={() => handleAdd()} >Add Record</button>
             {attenData.map((item) => (
              <div key={item._id}>
                <p>Status: {item.status}</p>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            ))}
          </section>
        )}

        {activeSection === 'leave-requests' && (
          <section id="leave-requests">
            <h2>Leave Requests</h2>
            <Link to={'/leaveRequest'}>
              <button>View Leave Requests</button>
            </Link>
            {leavedata.map((item) => (
              <div className="leave-entry" key={item.id}>
                <strong>{item.name}</strong>
                <p>Start Date: {item.startDate}</p>
                <p>End Date: {item.endDate}</p>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            ))}
          </section>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
