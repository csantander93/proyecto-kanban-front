import React, { useEffect, useState } from "react";
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
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const endDate = new Date(taskDetails.fechaFin);
      const difference = endDate - now;
      if (difference > 0) {
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining(null);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isOpen, taskDetails.fechaFin]);

  let textColor = 'green';

  if (timeRemaining) {
    if (timeRemaining.days < 1) {
      textColor = 'red';
    } else if (timeRemaining.days < 3) {
      textColor = 'orange';
    }
  }

  return (
    <Draggable defaultPosition={defaultPosition}>
      <FormContainer style={{ display: isOpen ? 'block' : 'none' }}>
        <h2>Detalles de la tarea</h2>
        {timeRemaining && (taskDetails.estado === "EN PROCESO" || taskDetails.estado === "PARA HACER") && (
          <h4 style={{ color: textColor }}>
            Tiempo restante: {timeRemaining.days} días, {timeRemaining.hours} hs, {timeRemaining.minutes} min, {timeRemaining.seconds} segundos
          </h4>
        )}
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