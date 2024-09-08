import React, { useState } from 'react';
import '../styles/Join.css';
import Login from './Login.js';
import Signup from './Signup.js';
import GoogleLogin from './GoogleLogin.js'

function Join() {

  const [loginState, setLoginState] = useState(true);
  const [signupState, setSignupState] = useState(false);

return (
    <div className="join-page">

      <div className="signup-login-container">
        <div className="login-wrapper">
          <div className="login-container">

            <Login
              signupState={signupState}
              setLoginState={setLoginState}
              setSignupState={setSignupState}
            />

            <GoogleLogin/>

          </div>
        </div>

        <div className="signup-wrapper">
          <div className="signup-container">
            
            <Signup
              loginState={loginState}
              setLoginState={setLoginState}
              setSignupState={setSignupState}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
