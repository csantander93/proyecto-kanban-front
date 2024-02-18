import Login from "./Login";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Body from "./BodyPrincipal";
import { UserProvider } from "./UserContext";

function App () {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Body><Login /></Body>} />
          <Route path="/register" element={<Body><Register /> </Body>} />
          <Route path="/home" element={<Home />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App;