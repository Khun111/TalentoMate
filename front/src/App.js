import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Landingpage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AboutUs from './AboutUs';
import Services from './Services';
import Contact from './Contact';
import EmployeeDirectory from './EmployeeDirectory';
import EditUser from './EditUser';
import CreateAttendance from './CreateAttendance';
import ViewAttendance from './ViewAttendance';
import EditAttendance from './EditAttendance';
// onClick={() => handleAdd()}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/createUser" element={<EmployeeDirectory />} />
      <Route path="/editUser/:id" element={<EditUser />} />
      <Route path='/editAttendance/:id' element={<EditAttendance />} />
      <Route path="/createAttendance/:id" element={<CreateAttendance />} />
      <Route path="/attendance/:id" element={<ViewAttendance />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" component={EmployeeDashboard} />
    </Routes>
  );
};

export default App;






