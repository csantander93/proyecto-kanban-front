import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { PiUserCircleFill } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import MenuOption from "./MenuOption";

const Contenedor = styled.div`
  position: relative;
  margin: 5px 10px 5px 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 90%;
  min-height: auto;
  background-color: aliceblue;
  border-radius: 5px;
  border: none;
  color: black;
  display: grid;
  flex-direction: column;
  background-color: rgba(90, 90, 90, 0.5);
  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5px;
  color: #c9c9c9;
  text-align: left;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AssignTask = styled(PiUserCircleFill)`
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    color: #1d90cc;
  }
`;

const Options = styled(SlOptions)`
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    color: #1d90cc;
  }
`;

function Task(props) {
  const [menuOpen, setMenuOpen] = useState(props.isOpenMenu);
  const menuRef = useRef(null);

  useEffect(() => {
    setMenuOpen(props.isOpenMenu);
  }, [props.isOpenMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    props.onClickMenu(); // Llama a la función para actualizar el estado en el componente TaskBoard
  };

  return (
    <Contenedor ref={menuRef}>
      <Span>
        {props.titulo}
        <IconContainer>
          <Options title="Opciones" onClick={toggleMenu}/>
          <AssignTask title="Asignar usuario"/>
        </IconContainer>
      </Span>
      {menuOpen && <MenuOption isOpen={menuOpen}  idTarea={props.idTarea} titulo={props.titulo} fetchData={props.fetchData}/>}
    </Contenedor>
  );
}

export default Task;
