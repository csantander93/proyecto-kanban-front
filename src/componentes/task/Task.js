import React from "react";
import styled from 'styled-components';
import { PiUserCircleFill } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";

const Contenedor = styled.div`
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
  display: flex; /* Establece el contenedor como flexbox */
  align-items: center; /* Alinea los elementos verticalmente en el centro */
  justify-content: space-between; /* Distribuye los elementos horizontalmente */
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
  margin-left: 10px; /* Ajusta el margen izquierdo */
  margin-right: 10px;
  &:hover {
    color: #1d90cc;
  }
`;

const Options = styled(SlOptions)`
  font-size: 24px;
  margin-left: 10px; /* Ajusta el margen izquierdo */
  margin-right: 10px;
  &:hover {
    color: #1d90cc;
  }
`;

function Task(props) {
  return (
    <Contenedor>
      <Span>
        {props.titulo}
        <IconContainer>
          <Options title="Opciones"/>
          <AssignTask title="Asignar usuario" />
        </IconContainer>
      </Span>
    </Contenedor>
  );
}
export default Task;