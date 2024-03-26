import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { PiUserCircleFill } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import MenuOption from "./MenuOption";
import AddUserToTask from "../user/AddUserToTask";

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

const AddUserContainer = styled.div`
  position: relative;
  z-index: 3;
  bottom: 28px;
`;

function Task(props) {
  const [menuOpenTask, setMenuOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const menuRef = useRef(null);
  const assignRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((menuOpenTask && menuRef.current && !menuRef.current.contains(event.target)) ||
          (assignOpen && assignRef.current && !assignRef.current.contains(event.target))) {
        setMenuOpen(false);
        setAssignOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpenTask, assignOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpenTask);
  };

  const toggleAssign = () => {
    setAssignOpen(!assignOpen);
    setMenuOpen(false);
  };

  return (
    <Contenedor ref={menuRef}>
      <Span>
        {props.titulo}
        <IconContainer>
          <Options title="Opciones" onClick={toggleMenu}/>
          <AssignTask title="Asignar usuario" onClick={toggleAssign} />
        </IconContainer>
      </Span>
      {menuOpenTask && <MenuOption isOpen={menuOpenTask}  idTarea={props.idTarea} titulo={props.titulo} fetchData={props.fetchData}/>}
      {assignOpen && (
        <AddUserContainer ref={assignRef}>
          <AddUserToTask ref={assignRef} isOpen={assignOpen} idProyecto={props.idProyecto} idTarea={props.idTarea} />
        </AddUserContainer>
      )}
    </Contenedor>
  );
}

export default Task;
