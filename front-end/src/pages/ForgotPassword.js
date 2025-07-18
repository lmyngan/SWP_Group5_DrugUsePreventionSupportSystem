import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const ForgotPassword = () => {
    const [accountname, setAccountname] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setMessage('If this username exists, a reset link has been sent.');
        } catch (error) {
            setMessage('Failed to send reset request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            id="accountname"
                            placeholder="Account Name"
                            value={accountname}
                            onChange={(e) => setAccountname(e.target.value)}
                            required
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                        </svg>
                    </div>
                    {message && <div className="mb-4 text-center text-white">{message}</div>}
                    <button type="submit" className='btn' disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                <div className="register-link">
                    <p>Back to <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;