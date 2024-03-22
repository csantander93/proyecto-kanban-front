import React, { useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import DetailsTask from "./DetailsTask";
import EditTask from "./EditTask";

const MenuContainer = styled.div`
  position: absolute;
  top: calc(15% + 5px);
  right: calc(15% + 5px);
  background-color: black;
  border: none;
  border-radius: 10px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 1;
`;

const MenuItem = styled.div`
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #545454;
  }
`;

function MenuOption(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [taskEdit, setTaskEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDeleteClick = async () => {
    const { idTarea, titulo } = props;
    const confirmDelete = window.confirm(`¿Estás seguro que deseas borrar la tarea: \n<<${titulo}?>>`);
    if (confirmDelete) {
      try {
        const response = await axios.put(`http://localhost:8080/tarea/bajaTarea/${idTarea}`);
        console.log("Tarea eliminada exitosamente");
        props.fetchData();
      } catch (error) {
        console.error("Error al eliminar la tarea", error);
      }
    }
  };

  const handleViewDetails = async () => {
    const { idTarea } = props;
    console.log(idTarea);
    try {
      const response = await axios.get(`http://localhost:8080/tarea/traerTareaPorId/${idTarea}`);
      setTaskDetails(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error("Error al obtener los detalles de la tarea", error);
    }
  };

  const handleEditTask = async () => {
    const { idTarea } = props;
    try{
      const response = await axios.get(`http://localhost:8080/tarea/traerTareaPorId/${idTarea}`);
      setTaskEdit(response.data)
      setShowEditForm(true)
    } catch (error) {
      console.error("Error al intentar editar la tarea" , error);
    }
  };

  return (
    <MenuContainer isOpen={props.isOpen}>
      <MenuItem onClick={handleViewDetails}>Ver detalles</MenuItem>
      <MenuItem onClick={handleEditTask}>Editar</MenuItem>
      <MenuItem onClick={handleDeleteClick}>Eliminar</MenuItem>
      {showDetails && taskDetails && (
        <DetailsTask
          isOpen={showDetails}
          taskDetails={taskDetails}
          defaultPosition={{ x: window.innerWidth / 2 - 1120, y: window.innerHeight / 2 - 400 }}
        />
      )}
      {showEditForm && (
        <EditTask
          taskEdit={taskEdit}
          fetchData={props.fetchData}
          defaultPosition={{ x: window.innerWidth / 2 - 1120, y: window.innerHeight / 2 - 800 }}
        />
      )}
    </MenuContainer>
  );
}

export default MenuOption;
