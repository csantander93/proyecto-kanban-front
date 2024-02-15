import React, { useState, useEffect } from "react";
import axios from "axios";

function AppApis () {
  const [user, setUser] = useState([]);

  const fetchData = () => {
    return axios.get("http://localhost:8080/usuario/traerUsuarios")
    .then((response) => setUser(response.data));
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {user && user.length > 0 && user.map((userObj, index) => (
          <li key={userObj.id}>{userObj.usuario} {userObj.email} </li>
        ))}
      </ul>
    </div>
  )
}

export default AppApis;