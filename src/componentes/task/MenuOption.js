import React from "react";
import styled from 'styled-components';
import axios from "axios";

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
  
  const handleDeleteClick = async () => {
    const { idTarea, titulo } = props; // Accede a los datos de la tarea desde props
    console.log(idTarea, titulo);
    const confirmDelete = window.confirm(
      `¿Estás seguro que deseas borrar la tarea ${titulo}?`
    );
    if (confirmDelete) {
      try {
        const response = await axios.put(`http://localhost:8080/tarea/bajaTarea/${idTarea}`);
        console.log("Tarea eliminada exitosamente");
        props.fetchData()
      } catch (error) {
        console.error("Error al eliminar la tarea", error);
      }
    }
  };

  return (
    <MenuContainer isOpen={props.isOpen}>
      <MenuItem>Ver detalles</MenuItem>
      <MenuItem>Editar</MenuItem>
      <MenuItem onClick={handleDeleteClick}>Eliminar</MenuItem>
    </MenuContainer>
  );
}

export default MenuOption;
