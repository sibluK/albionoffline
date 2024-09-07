import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../firebaseConfig'; 

function Login({ loginState, signupState, setLoginState, setSignupState }) {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            const user = userCredential.user;
            console.log('User logged in:', user);
            setSuccessMessage('Successfully logged in!');
            setShowSuccess(true);
            
            setTimeout(() => {
                setShowSuccess(false);
              }, 1500);
        
              setTimeout(() => {
                setSuccessMessage('');
                navigate('/'); 
              }, 2500);
        
        } catch (error) {
            console.error('Error during login:', error);
            setLoginError(error.message);
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
                type="text" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
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

        {loginError && <p>{loginError}</p>}

        <div className={`choose-login-container ${signupState ? 'visible' : 'hidden'}`}>
            <h3>Already have an account?</h3>
            <button className="login-submit-button" onClick={() => {
                setLoginState(true);
                setSignupState(false);
                clearInputs();
            }}>
                Log In
            </button>
        </div>

    </>
  );
}

export default Login;
