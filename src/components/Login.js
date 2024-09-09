import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../firebaseConfig'; 

function Login({ signupState, setLoginState, setSignupState }) {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const errorMessage = "The email address or password you entered is incorrect. Please try again.";

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

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
            console.error('Error during login:', error);
            setLoginErrorMessage(error.message);
            setLoginError(true);
        }
    };

    const clearInputs = () => {
        setLoginEmail('');
        setLoginPassword('');
    }

return (
    <>
        {successMessage && (
            <div className={`success-message ${showSuccess ? 'success-visible' : ''}`}>
                {successMessage}
            </div>
        )}

        <h2>Log In</h2>
        <h4>
            Email: 
            <input 
                className={`${loginError ? 'invalid-credentials': ''}`}
                type="text" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
            />
        </h4>
        <h4>
            Password: 
            <input 
                className={`${loginError ? 'invalid-credentials': ''}`}
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
            />
            <span className="forgot-password-button">Forgot password?</span>
        </h4>
        

        {loginErrorMessage && <h4 className='login-error-message'>{errorMessage}</h4>}

        <button className="login-submit-button" onClick={handleLogin}>
            Login
        </button>


        <div className={`choose-login-container ${signupState ? 'visible' : 'hidden'}`}>
            <h3>Already have an account?</h3>
            <button className="login-submit-button" onClick={() => {
                setLoginState(true);
                setSignupState(false);
                clearInputs();
                setLoginError(false)
                setLoginErrorMessage(null)
            }}>
                Log In
            </button>
        </div>

    </>
  );
}

export default Login;
