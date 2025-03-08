import React, {useState} from 'react'
import "./Login.css"
import { Link , useNavigate} from 'react-router-dom'


const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = (e) => {
        e.preventDefault();
        setIsAuthenticated(true); // Simulate successful login
        navigate("/"); // Redirect to home
      };
  
    return (
      <div className="login-container">
        
        <form onSubmit={handleLogin}>
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
