import { UserContext } from "./UserContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ListadoProyectos from "./ListadoProyectos";
import styled from "styled-components";
 
const Body = styled.body`
  background-color: red;
`;

function Home () {

  //obtenemos el usuario en contexto (usuario logueado)
  const {user} = useContext(UserContext);

  const [proyectos, setProyectos] = useState([]);

  const fetchData = () => {
    return axios.get(`http://localhost:8080/proyecto/traerProyectos/${user.id}`)
    .then((response) => setProyectos(response.data));
  }

  useEffect(() => {
    fetchData();
  }, [])

  
  return (
    <Body>
      <div>
          <h1>{user.usuario}</h1>
          <ListadoProyectos listaProyectos={proyectos}/>
      </div>
    </Body>
  )
}

export default Home