import styled from 'styled-components';
import { useState } from "react";
import Task from './Task';

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
  min-height: 150px;
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

function TaskBoard(props) {

  //consumir la api que obtiene las tareas del proyecto props.idProyecto


  const [tareas, setTareas] = useState([]);
  const [porHacer, setPorHacer] = useState([]);
  const [enProceso, setEnProceso] = useState([]);
  const [finalizado, setfinalizado] = useState([]);
  const [enRevision, setEnRevision] = useState([]);
  const [aprobado, setAprobado] = useState([]);

 const separarTareasEstados = () => {
  tareas.map((tarea, index)=>{
    if(tarea.estado === "PARA HACER"){
      setPorHacer(porHacer.push(tarea));
    }else if(tarea.estado === "EN PROCESO"){
      setEnProceso(enProceso.push(tarea));
    }else if(tarea.estado === "FINALIZADO"){
      setfinalizado(finalizado.push(tarea));
    }else if(tarea.estado === "EN REVISIÓN"){
      setEnRevision(enRevision.push(tarea));
    }else if(tarea.estado === "APROBADO"){
      setAprobado(aprobado.push(tarea));
    }
  }
  );
 }

  const [items, setItems] = useState([]); // Inicialmente vacío
  const estados = ["PARA HACER", "EN PROCESO", "FINALIZADO", "EN REVISIÓN", "APROBADO"]; // Textos para cada item

  return (
    <DrawerContainer>
      {estados.map((estado, index) => (
        <Item key={index}>
          <ItemText>{estado}</ItemText>
          {items[index] ? items[index] : null}
          {estado === "PARA HACER" && porHacer.length > 0 && porHacer.map((tarea, index) =>{
            
          })}
        </Item>
      ) 
      )}
    </DrawerContainer>
  );
}

export default TaskBoard;
