import styled from 'styled-components';
import { useState, useEffect, useRef } from "react";
import Task from './Task';
import axios from 'axios';
import { RiAddCircleFill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import SearchTask from './SearchTask';


const DrawerContainer = styled.div`
  font-family: sans-serif;
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
  text-align: e;
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
    background-color:${props => props.crearTarea ? "null" : "rgba(120, 120, 120, 0.5)"};
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
  margin-right: 5px;
  border-radius: 5px;
  background-color: rgb(90, 90, 90);
  overflow-x: hidden; /* Muestra la barra de desplazamiento horizontal si el contenido es demasiado ancho */
  overflow-y: hidden; /* Oculta la barra de desplazamiento vertical */
  white-space: nowrap; /* Evita que el texto se envuelva */
  &::placeholder {
    color: rgb(180, 180, 180);
  }
`;

const AddTaskButton = styled(IoMdSend)`
  font-size: 25px;
  color:rgb(54, 135, 186);
  margin-top: 4px;
  &:hover{
    font-size: 26px;
    color:rgb(85, 151, 193 );
  }
`;

const TaskBoardContainer = styled.div`
  background-color: #171719; /* Mismo color de fondo que el Header */
  border-radius: 10px; /* Borde redondeado */
`;

function TaskBoard(props) {

  const [error, setError] = useState([]);
  const [porHacer, setPorHacer] = useState([]);
  const [enProceso, setEnProceso] = useState([]);
  const [finalizado, setFinalizado] = useState([]);
  const [enRevision, setEnRevision] = useState([]);
  const [aprobado, setAprobado] = useState([]);

  //estado que controla si se hace click en el icono de agregarTarea
  const [crearTarea, setCrearTarea] = useState(false);

  //para controlar cuando se hace click fuera del text area de crear tarea
  const ContainerAddTaskRef = useRef(null);

  //consumir la api que obtiene las tareas del proyecto props.idProyecto
  const fetchData = () => {
    return axios.get(`http://localhost:8080/tarea/traerTareas/${props.proyectoId}`)
    .then((response) => {
  
      console.log("response data:\n", response.data)
     
      separarTareasEstados(response.data);
      
    })
    .catch(error => {
      setError("Error al obtener tareas");
      console.log(error);
    });
  }

  const handleSearchTask = (searchTerm) => {
    if (searchTerm.trim() !== '') {
      // Realizar búsqueda por nombre
      axios.get(`http://localhost:8080/tarea/buscarTareasIdNombre/${props.proyectoId}/${searchTerm}`)
      .then((response) => {
        separarTareasEstados(response.data);
      })
      .catch(error => {
        console.error("Error al buscar proyectos:", error);
      });
    } else {
      // Si la barra de búsqueda está vacía, actualizar la lista de proyectos por ID
      fetchData();
    }
  };

  useEffect(() => {
    console.log("ID del proyecto seleccionado:", props.proyectoId);
    //trae las tareas cada vez que se cambia de proyecto
    fetchData();
    //cada vez que se hace click en un nuevo proyecto, el id dentro del estado de la nueva tarea sea el actual
    setNuevaTarea(
      {
        idProyecto: props.proyectoId,
        titulo: ""
      });

    // codigo para controlar el click fuera del componente TaskInput
    const handleClickOutside = (event) => {
      if (ContainerAddTaskRef.current && !ContainerAddTaskRef.current.contains(event.target)) {
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

  //ESTADOS NECESARIOS
  const [items, setItems] = useState([]); // Inicialmente vacío
  const estados = ["PARA HACER", "EN PROCESO", "FINALIZADO", "EN REVISION", "APROBADO"]; // Textos para cada item

  //------------CREAR TAREA--------
  //arranca en nulo ya que se actualiza luego en el usseEfect
  const [nuevaTarea, setNuevaTarea] = useState(null);
  //controla el cambio en el input de tarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  // Controla el click en el icono enviar 
  const handleAddTaskButton = () => {
  if(nuevaTarea.titulo != ""){
   fetchApiNewTask();
  }else{
    window.alert("El nombre de la tarea no puede ser vacío");
  }
  }

  //API PARA CREAR NUEVA TAREA
  const fetchApiNewTask = () => {

    return axios.post(`http://localhost:8080/tarea/crearTarea`, nuevaTarea)
    .then((response) => {
      setCrearTarea(false);
      setNuevaTarea(nuevaTarea.titulo = "");
      console.log("response data:\n", response.data);
      fetchData();
      
    })
    .catch(error => {
      setError("Error al crear tarea");
      console.log(error);
    });
  }
  
  //Se puede obswerevar como el handleClickAgregarPersonaIcon se obtiene desde el home y viaja hasta SearchTask
  //donde justamente se encuentra el Icono de agregar Persona
  return (
    <TaskBoardContainer >
      <SearchTask 
      onSearch={handleSearchTask}
      handleClickAgregarPersonaIcon = {props.handleClickAgregarPersonaIcon}></SearchTask>
      <DrawerContainer>
      {estados.map((estado, index) => (
        <Item key={index}>
           <ItemText>{estado}</ItemText>
          {items[index] ? items[index] : null}
          {estado === "PARA HACER" ? (
            <ContainerAddTask 
            crearTarea = {crearTarea}
            onClick={() => handleAddTask()}
            ref = {ContainerAddTaskRef}>
            {crearTarea === false ? (
              <>
                <AddTask />
                 <TextAdd>Agregar tarea</TextAdd>
              </>
              ) : (
              <>
                <TaskInput
                name='titulo'
                value={nuevaTarea.titulo}
                placeholder='Título de la tarea...' 
                required
                onChange={handleChange}/>

                <AddTaskButton 
                onClick={() => handleAddTaskButton()}/>
              </>
               
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
    </TaskBoardContainer>
  );
}

export default TaskBoard;
