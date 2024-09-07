import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

function Signup({ loginState, signupState, setLoginState, setSignupState }) {

    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [signupError, setSignupError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    
    const handleSignup = async () => {
    if (signupPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      const user = userCredential.user;
      console.log('User created:', user);

      setSuccessMessage('Successfully signed up!');
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);

      setTimeout(() => {
        setSuccessMessage('');
        setLoginState(true);
        setSignupState(false);
      }, 2500);
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupError(error.message);
    }
  };

  const clearInputs = () => {
    setSignupEmail('');
    setSignupPassword('');
    setConfirmPassword('');
}

  return (
    <>
        {successMessage && (
            <div className={`success-message ${showSuccess ? 'success-visible' : ''}`}>
                {successMessage}
            </div>
        )}
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

        {signupError && <p>{signupError}</p>}

        <div className={`choose-signup-container ${loginState ? 'visible' : 'hidden'}`}>
            <h3>Have not yet signed up?</h3>
            <button className="signup-submit-button" onClick={() => {
                setLoginState(false);
                setSignupState(true);
                clearInputs();
            }}>
            Sign Up
            </button>
        </div>

    </>
  );
}

export default Signup;