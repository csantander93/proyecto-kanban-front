import styled from 'styled-components';
import { useState, useEffect } from "react";
import Task from './Task';
import axios from 'axios';

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


  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState([]);
  const [porHacer, setPorHacer] = useState([]);
  const [enProceso, setEnProceso] = useState([]);
  const [finalizado, setFinalizado] = useState([]);
  const [enRevision, setEnRevision] = useState([]);
  const [aprobado, setAprobado] = useState([]);

  //consumir la api que obtiene las tareas del proyecto props.idProyecto
  const fetchData = () => {
    return axios.get(`http://localhost:8080/tarea/traerTareas/${props.proyectoId}`)
    .then((response) => {
      setTareas(response.data);
      separarTareasEstados();
    })
    .catch(error => {
      setError("Error al obtener proyectos");
    });
  }

  useEffect(() => {
    fetchData();
  }, []);


  const separarTareasEstados = () => {
    const nuevoPorHacer = [];
    const nuevoEnProceso = [];
    const nuevoFinalizado = [];
    const nuevoEnRevision = [];
    const nuevoAprobado = [];
  
    tareas.forEach((tarea) => {
      switch (tarea.estado) {
        case "PARA HACER":
          nuevoPorHacer.push(tarea);
          break;
        case "EN PROCESO":
          nuevoEnProceso.push(tarea);
          break;
        case "FINALIZADO":
          nuevoFinalizado.push(tarea);
          break;
        case "EN REVISION":
          nuevoEnRevision.push(tarea);
          break;
        case "APROBADO":
          nuevoAprobado.push(tarea);
          break;
        default:
          break;
      }
    });
  
    setPorHacer(nuevoPorHacer);
    setEnProceso(nuevoEnProceso);
    setFinalizado(nuevoFinalizado);
    setEnRevision(nuevoEnRevision);
    setAprobado(nuevoAprobado);
  };


  const [items, setItems] = useState([]); // Inicialmente vacío
  const estados = ["PARA HACER", "EN PROCESO", "FINALIZADO", "EN REVISION", "APROBADO"]; // Textos para cada item

  return (
    <DrawerContainer>
      {estados.map((estado, index) => (
        <Item key={index}>
          {/*<button>agregar incidencia</button>*/}
          <ItemText>{estado}</ItemText>
          {items[index] ? items[index] : null}

          {(() => {
            switch(estado){

              case "PARA HACER":
                return porHacer.map((tarea, index) => {
                  return <Task key={index} titulo = {tarea.titulo}/>
                });
                break;
              
              case "EN PROCESO":
                return enProceso.map((tarea, index) => {
                   return <Task key={index} titulo = {tarea.titulo}/>
                });
               break;

               case "FINALIZADO":
                return finalizado.map((tarea, index) => {
                   return <Task key={index} titulo = {tarea.titulo}/>
                });
               break;

               case "EN REVISION":
                return enRevision.map((tarea, index) => {
                   return <Task key={index} titulo = {tarea.titulo}/>
                });
               break;

               case "APROBADO":
                return aprobado.map((tarea, index) => {
                   return <Task key={index} titulo = {tarea.titulo}/>
                });
               break;

            }
          })()}
          
        </Item>
      ) 
      )}
    </DrawerContainer>
  );
}

export default TaskBoard;
