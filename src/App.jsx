import { Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
function App() {


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
