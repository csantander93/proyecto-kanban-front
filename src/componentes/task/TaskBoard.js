import styled from 'styled-components';
import { useState } from "react";

const DrawerContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Distribuye los elementos con espaciado igual */
  min-height: 300px; /* Tamaño mínimo del contenedor */
  min-width: 800px; /* Ancho mínimo del contenedor */
`;

const Item = styled.div`
  background-color: #0F0F0F;
  color: white;
  width: 250px;
  height: 150px;
  margin: 5px;
  border: 2px solid #1A1A1D;
  border-radius: 10px;
  position: relative; /* Establece el contexto de posicionamiento para los elementos hijos */
`;

const ItemText = styled.div`
  font-family: sans-serif;
  font-size: 13px;
  color: #6F6F85;
  text-align: start;
  margin-top: 10px; /* Ajuste de margen superior */
  margin-left: 10px; /* Ajuste de margen izquierdo */
  position: absolute; /* Posiciona de forma absoluta */
  top: 0; /* Lo posiciona en la esquina superior */
  left: 0; /* Lo posiciona en la esquina izquierda */
`;

function TaskBoard() {

  const [items, setItems] = useState([]); // Inicialmente vacío
  const statuses = ["PARA HACER", "EN PROCESO", "FINALIZADO", "EN REVISIÓN", "APROBADO"]; // Textos para cada item

  return (
    <DrawerContainer>
      {statuses.map((status, index) => (
        <Item key={index}>
          <button>agregar incidencia</button>
          <ItemText>{status}</ItemText>
          {items[index] ? items[index] : null}
        </Item>
      ))}
    </DrawerContainer>
  );
}

export default TaskBoard;
