import { Routes, Route, Navigate } from "react-router-dom"
import React, {useState} from "react"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import Home from "./pages/home"

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
