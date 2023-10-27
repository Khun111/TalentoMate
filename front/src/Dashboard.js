import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS for Dashboard
import Logo from './Logo 1.png';
import D3Chart from './D3Chart.js';
import D3ChartLeave from './D3ChartLeave.js';
import JohnDoeImage from './JohnDoe.jpg';
import JaneSmithImage from './JaneSmith.jpg';
import AliceJohnsonImage from './AliceJohnson.jpg';
import BobWilsonImage from './BobWilson.jpg';
import EvaGreenImage from './EvaGreen.jpg';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
 
  const dashboardData = [
    { label: 'Number of Employees', value: 50, color: '#3498db' },
    { label: 'Attendance Rate', value: '92%', color: '#e67e22' },
    { label: 'Leave Requests', value: 10, color: '#27ae60' },
  ];
  
  const fakeAttendanceData = [
    { name: 'John Doe', attendance: 90 },
    { name: 'Jane Smith', attendance: 85 },
    { name: 'Alice Johnson', attendance: 65},
    { name: 'Bob Wilson', attendance: 75},
    { name: 'Eva Green', attendance: 55},
  ]

  const fakeLeaveData = [
    { name: 'John Doe', leaveRequests: 3 },
    { name: 'Jane Smith', leaveRequests: 2 },
    { name: 'Alice Johnson', leaveRequests: 4},
    { name: 'Bob Wilson', leaveRequests: 4},
    { name: 'Eva Green', leaveRequests: 3},
  ];

  const [employeeData, setEmployeeData] = useState([
    {
      id: 1,
      name: 'John Doe',
      position: 'Manager',
      email: 'john@example.com',
      image: JohnDoeImage,
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Developer',
      email: 'jane@example.com',
      image: JaneSmithImage,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      position: 'HR Specialist',
      email: 'alice@example.com',
      image: AliceJohnsonImage,
    },
    {
      id: 4,
      name: 'Bob Wilson',
      position: 'Sales Representative',
      email: 'bob@example.com',
      image: BobWilsonImage,
    },
    {
      id: 5,
      name: 'Eva Green',
      position: 'Graphic Designer',
      email: 'eva@example.com',
      image: EvaGreenImage,

    },
    // Add more initial employee data
  ]);

  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      name: 'John Doe',
      date: '2023-03-01',
      hoursWorked: 8,
      image: JohnDoeImage,
    },
    {
      id: 2,
      name: 'Jane Smith',
      date: '2023-03-01',
      hoursWorked: 7,
      image: JaneSmithImage,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      date: '2023-03-01',
      hoursWorked: 8,
      image: AliceJohnsonImage,
    },
    {
      id: 4,
      name: 'Bob Wilson',
      date: '2023-03-01',
      hoursWorked: 8,
      image: BobWilsonImage,
    },
    {
      id: 5,
      name: 'Eva Green',
      date: '2023-03-01',
      hoursWorked: 7,
      image: EvaGreenImage,
    }
    // Add more initial attendance data
  ]);




  const [leaveData, setLeaveData] = useState([
    {
      id: 1,
      name: 'John Doe',
      startDate: '2023-03-15',
      endDate: '2023-03-20',
      image: JohnDoeImage,
    },
    {
      id: 2,
      name: 'Jane Smith',
      startDate: '2023-03-10',
      endDate: '2023-03-14',
      image: JaneSmithImage,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      startDate: '2023-03-20',
      endDate: '2023-03-25',
      image: AliceJohnsonImage,
    },
    {
      id: 4,
      name: 'Bob Wilson',
      startDate: '2023-03-12',
      endDate: '2023-03-16',
      image: BobWilsonImage,
    },
    {
      id: 5,
      name: 'Eva Green',
      startDate: '2023-03-25',
      endDate: '2023-03-30',
      image: EvaGreenImage,
    },
    // Add more initial leave request data
  ]);

  const [setEditData] = useState({
    id: null,
    name: '',
    position: '',
    email: '',
  });

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleAdd = (newData, section) => {
    newData.id = section === 'employee-directory' ? employeeData.length + 1 : section === 'attendance-records' ? attendanceData.length + 1 : leaveData.length + 1;

    if (section === 'employee-directory') {
      setEmployeeData([...employeeData, newData]);
    } else if (section === 'attendance-records') {
      setAttendanceData([...attendanceData, newData]);
    } else if (section === 'leave-requests') {
      setLeaveData([...leaveData, newData]);
    }
  };

  const handleDelete = (id, section) => {
    if (section === 'employee-directory') {
      setEmployeeData(employeeData.filter((item) => item.id !== id));
    } else if (section === 'attendance-records') {
      setAttendanceData(attendanceData.filter((item) => item.id !== id));
    } else if (section === 'leave-requests') {
      setLeaveData(leaveData.filter((item) => item.id !== id));
    }
    
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
              {dashboardData.map((item, index) => (
                <div key={index} className="dashboard-box" style={{ backgroundColor: item.color }}>
                  <h3 className="dashboard-label">{item.label}</h3>
                  <p className="dashboard-value">{item.value}</p>
                </div>
              ))}
              </div>
          </section>
        )}

        {activeSection === 'employee-directory' && (
          <section id="employee-directory">
            <h2>Employee Directory</h2>
            <div class="employee-directory-controls">
            <button onClick={() => handleAdd({ name: 'New Employee', position: '', email: '' }, 'employee-directory')}>
              Add Employee
            </button>
            {employeeData.map((item) => (
              <div key={item.id} className="employee-entry">
              <img src={item.image} alt={item.name} className="employee-image" />
              <div className="details">
              <strong>{item.name}</strong>
              <p className="employee-position">Position: {item.position}</p>
              <p className="employee-email">Email: {item.email}</p>
              </div>
           <button className="edit-button" onClick={() => setEditData(item)}>Edit</button>
         <button className="delete-button" onClick={() => handleDelete(item.id, 'employee-directory')}>Delete</button>
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
              <button onClick={() => setEditData(item)}>Edit</button>
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
        <button onClick={() => setEditData(item)}>Edit</button>
        <button onClick={() => handleDelete(item.id, 'leave-requests')}>Delete</button>
      </div>
            ))}
            <D3ChartLeave data={fakeLeaveData} />
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
