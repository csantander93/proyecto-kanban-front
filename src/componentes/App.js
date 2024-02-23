import Login from "./main/Login";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Register from "./main/Register.js";
import Home from "./main/Home.js";
import Body from "./main/BodyPrincipal";
import { UserProvider } from "./contexts/UserContext.js";
import BodyHome from "./main/BodyHome.js";

function App () {
  
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Body><Login /></Body>} />
          <Route path="/register" element={<Body><Register /> </Body>} />
          <Route path="/home" element={<BodyHome><Home /></BodyHome>} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </Router>
    </UserProvider>
  )
  

}

export default App;