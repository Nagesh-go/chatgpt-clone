import React,{useState} from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
    const showError = () => {
        toast.error("Both passwords are not same!");
      };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setrepeatPassword] = useState("");
  const navigate = useNavigate();
      const handleSubmit = (e) => {
        e.preventDefault();
        if(password === repeatpassword){
            navigate("/login");
        }
        else{
            showError();
        }
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
            <ToastContainer/>
          </form>
        </div>
      );
  }

export default Signup
