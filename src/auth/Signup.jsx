import React,{useState} from 'react'
import "./Signup.css"
import { Link } from 'react-router-dom'
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setrepeatPassword] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with", email, password);
      };
    
      return (
        <div className="signup-container">
          
          <form onSubmit={handleSubmit}>
          <h2>ChatGPT Signup</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              value={repeatpassword}
              onChange={(e) => setrepeatPassword(e.target.value)}
              required
            />
            <button type="submit">Create</button>
            <p>Already have account?<Link to="/login">Sign Up</Link></p>
          </form>
        </div>
      );
  }

export default Signup
