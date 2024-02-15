import Login from "./Login";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";

const PrincipalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(238, 238, 238, 0.7); /* Color de fondo con transparencia */
  border-radius: 10px; /* Bordes redondeados */
`;


function App () {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PrincipalBox><Login /></PrincipalBox>} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </Router>
  )
}

export default App;