import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Landingpage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
// import EmployeeDashboard from './EmployeeDashboard';
import AboutUs from './AboutUs';
import Services from './Services';
import Contact from './Contact';
import EmployeeDirectory from './EmployeeDirectory';
import EditUser from './EditUser';
import CreateAttendance from './CreateAttendance';
import ViewAttendance from './ViewAttendance';
import EditAttendance from './EditAttendance';
import LeaveRequest from './LeaveRequest';
import CreateLeaveRequest from './CreateLeaveRequest';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import EmployeeDashboard from './EmployeeDashboard';
import ResetLink from './ResetLink';
import ResetSuccess from './ResetSuccess';
// onClick={() => handleAdd()}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* User Routes */}
      <Route path="/createUser" element={<EmployeeDirectory />} />
      <Route path="/editUser/:id" element={<EditUser />} />
      {/* Attendance Routes */}
      <Route path='/editAttendance/:id' element={<EditAttendance />} />
      <Route path="/createAttendance/:id" element={<CreateAttendance />} />
      <Route path="/attendance/:id" element={<ViewAttendance />} />
      {/* Leave Routes */}
      <Route path="/leaveRequest/:id" element={<LeaveRequest />} />
      <Route path="/createLeaveRequest/:id" element={<CreateLeaveRequest />} />
      {/* Authentication Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/resetLink" element={<ResetLink />} />
      <Route path="/resetSuccess" element={<ResetSuccess />} />
      {/* DashBoard Routes */}
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/empdashboard" element={<EmployeeDashboard/>} />
    </Routes>
  );
};

export default App;






