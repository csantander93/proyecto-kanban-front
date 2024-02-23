import { UserContext } from "../contexts/UserContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProjectList from "../project/ProjectList";
import styled from "styled-components";
import FormProject from "../project/FormProject";


const H1 = styled.h1 `
  font-family: sans-serif;
  text-align: center;
  border: 1px solid white;
  border-radius: 10px;
  background-color: #22D9EE;
`;

const Header = styled.header `
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  z-index: 9997;
  transition: all 0.5s;
  padding: 0 15px;
  /*background-color: #040b14;*/
  background-color: #171719;
  overflow: auto;
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

  const actualizarProyectos = ()=>{
    fetchData();
  }
  return (
    <Header>
        <H1>{user.usuario}</H1>
        <FormProject actualizarProyectos = {actualizarProyectos}/>
       
        <ProjectList listaProyectos={proyectos}/>
        
     </Header>
  )
}

export default Home