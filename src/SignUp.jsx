import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import {auth} from './Context/Firebase'
import { Link, useNavigate } from "react-router-dom";


const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
const navigate = useNavigate();
const handleSubmit = (e) => {
  e.preventDefault();
    createUserWithEmailAndPassword( auth, formData.email, formData.password)
    .then(() => navigate("/"))
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="signup-btn" type="submit">Sign Up</button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
