import { UserContext } from "../contexts/UserContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProjectList from "../project/ProjectList";
import styled from "styled-components";
import FormProject from "../project/FormProject";
import TaskBoard from "../task/TaskBoard";
import GlobalStyles from "./GlobalStyles";

const Container = styled.div`
  margin-left: 170px;
  padding: 0;
  overflow: hidden; /* Evita que haya scroll horizontal o vertical */
  background-color: #171719;
  width: 100vw; /* Ocupa todo el ancho de la ventana */
  height: 100vh; /* Ocupa todo el alto de la ventana */
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
`;

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
  width: 250px;
  z-index: 9997;
  transition: all 0.5s;
  padding: 0 15px;
  background-color: #171719;
  overflow: hidden;
  border-right: 2px solid #272729; /* Color del borde más claro */
`;

const TaskBoardContainer = styled.div`
  background-color: #171719; /* Mismo color de fondo que el Header */
  padding: 20px; /* Espaciado interior */
  border-radius: 10px; /* Borde redondeado */
`;

function Home () {
  const {user} = useContext(UserContext);
  const [proyectos, setProyectos] = useState([]);

  const fetchData = () => {
    return axios.get(`http://localhost:8080/proyecto/traerProyectos/${user.id}`)
    .then((response) => setProyectos(response.data))
    .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetchData();
  }, [])

  const actualizarProyectos = () => {
    fetchData();
  }

  return (
    <>
    <GlobalStyles/>
      <Header>
        <H1>{user.usuario}</H1>
        <FormProject actualizarProyectos={actualizarProyectos} />
        <ProjectList listaProyectos={proyectos} actualizarProyectos={actualizarProyectos} />
      </Header>
      <Container>
        <TaskBoardContainer>
          <TaskBoard />
        </TaskBoardContainer>
      </Container>
    </>
  )
}

export default Home;