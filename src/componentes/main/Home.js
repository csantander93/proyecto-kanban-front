import { UserContext } from "../contexts/UserContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProjectList from "../project/ProjectList";
import styled from "styled-components";
import FormProject from "../project/FormProject";
import TaskBoard from "../task/TaskBoard";
import GlobalStyles from "./GlobalStyles";
import SearchProject from "../project/SearchProject";
import { IoIosNotifications } from "react-icons/io";

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
const Perfil = styled.button `

font-family: sans-serif;

  background-color: #1d90cc;
  position: absolute;
  top: 0;
  right: 0;
   padding: 10px; /* Añade un poco de espacio interno para que no esté pegado al borde */
   margin:20px;
border: none; /* Quita el borde para un aspecto más limpio */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s; /* Agrega una transición suave al cambio de color */
border-radius:10px;
  &:hover {
    background-color: #276465;
  }
`;
// Estilizando la ventana desplegable
const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 70px;
  right: 0;
  background-color: rgba(172, 158, 156, 0.4);
  min-width: 100px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  margin-right: 20px;
  padding: 12px 16px;
  z-index: 1;
  border: none;
  border-radius: 10px;

  a {
    font-family: sans-serif;
    display: block;
    margin-bottom: 15px;
    text-decoration: none;
    color: white;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: #1d90cc;
      transform-origin: bottom left;
      transition: transform 0.25s ease-out;
      transform: scaleX(0);
    }

    &#editar:hover::after {
      transform: scaleX(0.8);
    }
     &#cerrar:hover::after {
      transform: scaleX(1);
    }
  }
`;


const TaskBoardContainer = styled.div`
  background-color: #171719; /* Mismo color de fondo que el Header */
  padding: 20px; /* Espaciado interior */
  border-radius: 10px; /* Borde redondeado */
`;

const Campana = styled(IoIosNotifications )`
margin-right: 6px;
font-size: 45px;
margin-top:18px;
color:#1d90cc;
&:hover {
  font-size: 50px;
  cursor: pointer;
  transition: font-size 0.7s; /* Controla la velocidad de cambio en el hover */
  filter: brightness(70%); /* Reduce el brillo al pasar el cursor */
}
position: absolute;
top: 0;
right: 60px; /* Ajusta el valor de left según sea necesario */
`;

function Home () {
  const {user} = useContext(UserContext);
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    return axios.get(`http://localhost:8080/proyecto/traerProyectos/${user.id}`)
    .then((response) => {
      setProyectos(response.data);
    })
    .catch(error => {
      setError("Error al obtener proyectos");
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  const actualizarProyectos = () => {
    fetchData();
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <GlobalStyles/>
    
      <Header>
        
        <FormProject actualizarProyectos={actualizarProyectos} />
        <SearchProject></SearchProject>
        <ProjectList listaProyectos={proyectos} actualizarProyectos={actualizarProyectos} />
      </Header>
      <Container>
        <div>
          <Campana />
          <Perfil onClick={toggleDropdown}>{ user.nombre[0] }{ user.apellido[0] } </Perfil>
          <DropdownContent isOpen={isOpen}>
                  <a id="cerrar"href="#">Cerrar sesión</a>
                  <a id="editar"href="#">Editar perfil</a>
          </DropdownContent>
        </div>
        <TaskBoardContainer>s
          <TaskBoard />
        </TaskBoardContainer>
      </Container>
    </>
  )
}

export default Home;