import './App.css';
import React, { useState, useEffect } from 'react';
import LogoSection from './components/LogoSection';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async() => {

    }

    return (  
        <>
            <LogoSection />
            <div className="container">
                <div className="signup-card">
                    <div className="signup-section">
                        <h1 className='signup-title'>Log In</h1>
                        <input type="text" id='email' name='email' placeholder='Enter email' onChange={handleEmail} value={email}/>
                        <input type="password" id='password' name='password' placeholder='Enter password' onChange={handlePassword} value={password}/>
                        <button className='signup-button' onClick={handleLogin}>Log In</button>
                        <a href="/" className='redirect-to-login'>Don't have an account? Sign up Here!</a>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Login;