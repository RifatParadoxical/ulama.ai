import React, { useState } from 'react';

const ForgetPass = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate Firebase password reset request
        // In a real app, use Firebase's sendPasswordResetEmail
        if (email) {
            setMessage('An email has been sent to reset your password.');
        } else {
            setMessage('Please enter your email.');
        }
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '20px'
        }}>
            <h2 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
                Forgotten Password
            </h2>
            <p style={{ color: '#666', marginBottom: '20px', textAlign: 'center' }}>
                Enter your email address to receive a password reset link. <br /> Remember that Allah (SWT) is always there to guide and help us.
            </p>

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                <label htmlFor="email" style={{ marginBottom: '8px', color: '#333' }}>
                    Email Address:
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: '10px',
                        marginBottom: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}
                    required
                />
                <button type="submit" style={{
                    padding: '12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }}>
                    Reset Password
                </button>
                {message && <p style={{ color: '#007bff', marginTop: '10px', textAlign: 'center' }}>{message}</p>}
            </form>
        </div>
    );
};

export default ForgetPass;