import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './Context/Firebase'
import { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
        signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => navigate("/"))
        .catch((err) => alert(err))
      };

 const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          <Link to={"/forgot"}> Forgotten password? </Link>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
