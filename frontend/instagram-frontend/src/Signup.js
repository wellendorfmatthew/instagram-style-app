import './App.css';
import React, { useState, useEffect } from 'react';
import LogoSection from './components/LogoSection';
import { useSignup } from './useSignup';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useSignup();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSignup = async() => {
        await signup(email, password);
    }

    return (  
        <>
            <LogoSection />
            <div className="container">
                <div className="signup-card">
                    <div className="signup-section">
                        <h1 className='signup-title'>Sign Up</h1>
                        {error && <div className='error'>{error}</div>}
                        <input type="text" id='email' name='email' placeholder='Enter email' onChange={handleEmail} value={email}/>
                        <input type="password" id='password' name='password' placeholder='Enter password' onChange={handlePassword} value={password}/>
                        <button className='signup-button' onClick={handleSignup} disabled={isLoading}>Sign Up</button>
                        <a href="/login" className='redirect-to-login'>Already have an account? Login Here!</a>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Signup;