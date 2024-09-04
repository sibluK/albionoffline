import React, { useState } from 'react';
import '../styles/Join.css';

function Join() {

  const [loginState, setLoginState] = useState(true);
  const [signupState, setSignupState] = useState(false);

  const [loginSideState, setLoginSideState] = useState(null);
  const [signupSideState, setSignupSideState] = useState(null);
  
  // State for login inputs
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for signup inputs
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handler for login
  const handleLogin = () => {
    console.log('Login:', { loginUsername, loginPassword });
    // Add your login logic here
  };

  // Handler for signup
  const handleSignup = () => {
    console.log('Sign up:', { signupEmail, signupUsername, signupPassword, confirmPassword });
    // Add your signup logic here
  };

  return (
    <div className="join-page">
      <div className="signup-login-container">
        <div className="login-wrapper">
          <div className="login-container">
            <h2>Log In</h2>
            <h4>
              Username: 
              <input 
                type="text" 
                value={loginUsername} 
                onChange={(e) => setLoginUsername(e.target.value)} 
              />
            </h4>
            <h4>
              Password: 
              <input 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
              />
            </h4>
            <button className="login-submit-button" onClick={handleLogin}>
              Login
            </button>
            <div className={`choose-login-container
               ${signupState ? 'visible' : 'hidden'}`}>
              <h3>Already have an account?</h3>
              <button className="login-submit-button" onClick={() => {
                setLoginState(true);
                setSignupState(false);
                }}>
                Log In
              </button>
            </div>
          </div>
        </div>

        <div className="signup-wrapper">
          <div className="signup-container">
            <h2>Sign Up</h2>
            <h4>
              Email: 
              <input 
                type="email" 
                value={signupEmail} 
                onChange={(e) => setSignupEmail(e.target.value)} 
              />
            </h4>
            <h4>
              Username: 
              <input 
                type="text" 
                value={signupUsername} 
                onChange={(e) => setSignupUsername(e.target.value)} 
              />
            </h4>
            <h4>
              Password: 
              <input 
                type="password" 
                value={signupPassword} 
                onChange={(e) => setSignupPassword(e.target.value)} 
              />
            </h4>
            <h4>
              Confirm Password: 
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </h4>
            <button className="signup-submit-button" onClick={handleSignup}>
              Sign up
            </button>
            <div className={`choose-signup-container
               ${loginState ? 'visible' : 'hidden'}`}>
              <h3>Have not yet signed up?</h3>
              <button className="signup-submit-button" onClick={() => {
                setLoginState(false);
                setSignupState(true);
                }}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
