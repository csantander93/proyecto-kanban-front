import Login from "./Login";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Body from "./BodyPrincipal";

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Body><Login /></Body>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </Router>
  )
}

export default App;