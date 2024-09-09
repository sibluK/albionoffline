import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import { useNavigate } from 'react-router-dom'; 

function Signup({ loginState, setLoginState, setSignupState }) {

    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [signupError, setSignupError] = useState(false);
    const [signupErrorMessage, setSignupErrorMessage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    
    const errorMessages = {
      'auth/missing-password': 'Password is required. Try again.',
      'auth/email-already-in-use': 'The email address is already in use by another account. Try again.',
      'auth/invalid-email': 'The email address is not valid. Try again.',
      'auth/weak-password': 'The password is too weak. It should be at least 6 characters long.',
      'auth/missing-email': 'The email address is missing. Please input email.'
    };

    const handleSignup = async () => {
    if (signupPassword !== confirmPassword) {
        setSignupErrorMessage('Passwords do not match. Please check the passwords.')
        setSignupError(true);
        return;
    }

    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);

      setSuccessMessage('Successfully signed up!');
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/'); 
      }, 2000);
    } catch (error) {
      console.error('Error during signup:', error);
      const errorMessage = errorMessages[error.code] || 'An unknown error occurred. Please try again.';
      setSignupErrorMessage(errorMessage);
      setSignupError(true);
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
                className={`${signupError ? 'invalid-credentials': ''}`}
                type="email" 
                value={signupEmail} 
                onChange={(e) => setSignupEmail(e.target.value)} 
            />
            
        </h4>
        <h4>
            Password: 
            <input 
                className={`${signupError ? 'invalid-credentials': ''}`}
                type="password" 
                value={signupPassword} 
                onChange={(e) => setSignupPassword(e.target.value)} 
            />
        </h4>
        <h4>
            Confirm Password: 
            <input 
                className={`${signupError ? 'invalid-credentials': ''} `}
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />
        </h4>

        {signupErrorMessage && <h4 className='login-error-message'>{signupErrorMessage}</h4>}
        

        <button className="signup-submit-button" onClick={handleSignup}>
            Sign up
        </button>

        <div className={`choose-signup-container ${loginState ? 'visible' : 'hidden'}`}>
            <h3>Have not yet signed up?</h3>
            <button className="signup-submit-button" onClick={() => {
                setLoginState(false);
                setSignupState(true);
                clearInputs();
                setSignupError(false);
                setSignupErrorMessage('');
            }}>
            Sign Up
            </button>
        </div>

    </>
  );
}

export default Signup;