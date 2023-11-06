import React from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';

const ResetLink = () => {
  
  //   {
  //     navigate('/signin');

  //     Navigate to Dashboard on successful sign-in
  //     navigate('/dashboard');
  //   } else {
      
  //     Add logic to display an error message for invalname credentials if needed
  //   }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h3 className="text-center mb-4">A link to reset your password has been sent to your mail</h3>
            <Link to={'/'}>
                <button type="submit">Go back to Home</button>
              </Link>
            <div className="text-center mt-3">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetLink;

