import React from "react";
import styled from 'styled-components';
import Draggable from "react-draggable";

const FormContainer = styled.div`
  font-family: sans-serif;
  color: white;
  z-index: 1000;
  position: fixed;
  background-color: #3a3a40;
  border: none;
  border-radius: 5px;
  padding: 20px;
  max-width: 400px;
  width: 80%;
  box-shadow: 0px 0px 6px 1px #c9c9c9;
  cursor: pointer;
`;

function DetailsTask({ isOpen, taskDetails, defaultPosition }) {
  return (
    <Draggable defaultPosition={defaultPosition}>
      <FormContainer style={{ display: isOpen ? 'block' : 'none' }}>
        <h2>Detalles de la tarea</h2>
        <p>ID: {taskDetails.id}</p>
        <p>Título: {taskDetails.titulo}</p>
        <p>Descripción: {taskDetails.descripcion}</p>
        <p>Dificultad: {taskDetails.dificultad}</p>
        <p>Estado: {taskDetails.estado}</p>
        <p>Fecha de inicio: {taskDetails.fechaInicio}</p>
        <p>Fecha de fin: {taskDetails.fechaFin}</p>
      </FormContainer>
    </Draggable>
  );
}

export default DetailsTask;