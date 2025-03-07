import React, {useState} from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Logging in with", email, password);
    };
  
    return (
      <div className="login-container">
        
        <form onSubmit={handleSubmit}>
        <h2>ChatGPT Login</h2>
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
          <button type="submit">Login</button>
          <p>Don't have account?<Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    );
}

export default Login
