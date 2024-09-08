import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig.js';
import { useNavigate } from 'react-router-dom';

function GoogleLogin() {

    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
  
    const handleGoogleLogin = async () => {
      try {
        await signInWithPopup(auth, provider);
        setSuccessMessage('Successfully logged in!');
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 1500);
  
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/'); 
        }, 2000);
      } catch (error) {
        console.error('Error during Google sign-in: ', error);
      }
    };

  return (
    <>
        {successMessage && (
            <div className={`success-message ${showSuccess ? 'success-visible' : ''}`}>
                {successMessage}
            </div>
        )}
    
        <button className="google-login-button" onClick={handleGoogleLogin}>
            <img src='google.png' alt='google-logo'></img>
            Sign in with Google
        </button>
    </>

  );
}

export default GoogleLogin;