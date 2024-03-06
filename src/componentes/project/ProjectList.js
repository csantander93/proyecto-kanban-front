import React, { useState } from "react";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { FiInfo } from "react-icons/fi";
import axios from "axios";
import CustomModal from "./CustomModal"; // Importa el nuevo componente de modal

const Li = styled.li`
  position: relative;
  color: ${props => props.clicked ? "#9fffff" : "#c9c9c9"};
  background-color: ${props => props.clicked ? "#194070" : "none"};
  overflow: hidden;
  white-space: nowrap;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 13px;
  margin: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 3px 3px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translate(10px);
    background-color: #194070;
  }
`;

const Ul = styled.ul`
  height: 100%;
  padding: 0;
  margin: 0;
`;

const P = styled.p`
  padding-top: 50px;
  color: #c9c9c9;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 13px;
  text-align: center;
`;

const IconsContainer = styled.div`
  position: absolute;
  right: 5px;
  display: flex;
`;

const Info = styled(FiInfo)`
  margin-left: 6px;
  &:hover {
    font-size: 15px;
    cursor: pointer;
  }
`;

const Edit = styled(GrEdit)`
  margin-left: 6px;
  &:hover {
    font-size: 15px;
    cursor: pointer;
  }
`;

const Delete = styled(RiDeleteBin6Line)`
  margin-left: 6px;
  &:hover {
    font-size: 15px;
    color: red;
    cursor: pointer;
  }
`;

const Span = styled.span`
  margin-right: 24px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function ProjectList({ listaProyectos }) {
  const [selectedIdItem, setSelectedIdItem] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = (index) => {
    setSelectedIdItem(index);
  };

  const handleInfoClick = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:8080/proyecto/traerProyectoId/${projectId}`);
      const projectDetails = response.data; // Detalles del proyecto
      setSelectedProject(projectDetails);
      setModalIsOpen(true); // Abrir el modal
    } catch (error) {
      console.error("Error al obtener los detalles del proyecto:", error);
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalIsOpen(false); // Cerrar el modal
  };

  return (
    <div>
      <Ul>
        {listaProyectos && listaProyectos.length > 0 ? (
          listaProyectos.map((proyectoObj, index) => (
            <Li
              key={proyectoObj.id}
              onClick={() => handleClick(index)}
              clicked={index === selectedIdItem}
            >
              <Span title={proyectoObj.nombre}>{proyectoObj.nombre}</Span>
              {index === selectedIdItem && (
                <IconsContainer>
                  <Info onClick={() => handleInfoClick(proyectoObj.id)} />
                  <Edit />
                  <Delete />
                </IconsContainer>
              )}
            </Li>
          ))
        ) : (
          <P>No hay proyectos disponibles</P>
        )}
      </Ul>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Proyecto"
      >
        {selectedProject && (
          <div>
            <h2>{selectedProject.nombre}</h2>
            <p><strong>ID:</strong> {selectedProject.id}</p>
            <p><strong>Nombre:</strong> {selectedProject.nombre}</p>
            <p><strong>Descripción:</strong> {selectedProject.descripcion}</p>
            <p><strong>Fecha de Inicio:</strong> {selectedProject.fechaInicio}</p>
            <p><strong>Fecha de Fin:</strong> {selectedProject.fechaFin}</p>
          </div>
        )}
      </CustomModal>
    </div>
  );
}

export default ProjectList;
