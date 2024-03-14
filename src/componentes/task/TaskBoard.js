import styled from 'styled-components';
import { useState, useEffect, useRef } from "react";
import Task from './Task';
import axios from 'axios';
import { RiAddCircleFill } from "react-icons/ri";

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
  width: 100%;
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

const ContainerAddTask = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 10px;
  padding-top: ${props => props.crearTarea ? "0" : "5px"};
  padding-bottom: ${props => props.crearTarea ? "0" : "5px"};
  border-radius: 5px;
  width: 90%;
  &:hover{
    cursor: pointer;
    background-color: rgba(120, 120, 120, 0.5);
}

`;

const AddTask = styled(RiAddCircleFill)`
  margin-left: 10px;
  font-size: 20px;
  color: #c9c9c9;
 

`;

const DivRelleno = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const TextAdd = styled.span`
  color: #c9c9c9;
  margin-left: 10px;
  margin-top: 0.5px;
  font-size: 18px;
  font-family: sans-serif;
`;

const TaskInput = styled.textarea`
  color: white;
  width: 100%;
  height: 100%;
  resize: none;
  margin: 0;
  border-radius: 5px;
  background-color: rgb(90, 90, 90);
  overflow-x: hidden; /* Muestra la barra de desplazamiento horizontal si el contenido es demasiado ancho */
  overflow-y: hidden; /* Oculta la barra de desplazamiento vertical */
  white-space: nowrap; /* Evita que el texto se envuelva */
  &::placeholder {
    color: rgb(180, 180, 180);
  }
`;

function TaskBoard(props) {

  const [error, setError] = useState([]);
  const [porHacer, setPorHacer] = useState([]);
  const [enProceso, setEnProceso] = useState([]);
  const [finalizado, setFinalizado] = useState([]);
  const [enRevision, setEnRevision] = useState([]);
  const [aprobado, setAprobado] = useState([]);

  //estado par agregar la tarea
  const [crearTarea, setCrearTarea] = useState(false);

  //para controlar cuando se hace click fuera del text area de crear tarea
  const taskInputRef = useRef(null);

  //consumir la api que obtiene las tareas del proyecto props.idProyecto
  const fetchData = () => {
    return axios.get(`http://localhost:8080/tarea/traerTareas/${props.proyectoId}`)
    .then((response) => {
      console.log("response data:\n", response.data)
     
      separarTareasEstados(response.data);
      
    })
    .catch(error => {
      setError("Error al obtener proyectos");
      console.log(error);
    });
  }

  useEffect(() => {
    console.log("ID del proyecto seleccionado:", props.proyectoId);
    fetchData();

    // codigo para controlar el click fuera del componente TaskInput
    const handleClickOutside = (event) => {
      if (taskInputRef.current && !taskInputRef.current.contains(event.target)) {
        setCrearTarea(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };


  }, [props.proyectoId]);


  const separarTareasEstados = (tareas) => {
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

  const handleAddTask = () => {
    setCrearTarea(true);
  }


  const [items, setItems] = useState([]); // Inicialmente vacío
  const estados = ["PARA HACER", "EN PROCESO", "FINALIZADO", "EN REVISION", "APROBADO"]; // Textos para cada item

  return (
    <DrawerContainer>
      {estados.map((estado, index) => (
        <Item key={index}>
           <ItemText>{estado}</ItemText>
          {items[index] ? items[index] : null}
          
          {estado === "PARA HACER" ? (
            <ContainerAddTask 
            crearTarea = {crearTarea}
            onClick={() => handleAddTask()}>
            {crearTarea === false ? (
               <>
                <AddTask />
                 <TextAdd>Agregar tarea</TextAdd>
               </>
              ) : (
              <TaskInput
               ref = {taskInputRef}
               placeholder='Título de la tarea...'/>
              )}
           </ContainerAddTask>
            ) : (
            estado !== "PARA HACER" && <DivRelleno />
            )}

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
