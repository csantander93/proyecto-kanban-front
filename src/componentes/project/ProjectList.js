import React, { useState, useRef, useEffect} from "react";
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

const ContainerFormEdit = styled.div`
  margin-top: 10px;
  padding: 3px;
  border: solid 1px rgba(255,255,255,0.3);
  border-radius: 5px;
  align-items: center;
  color: white;
`;

// Styled para el formulario de edición
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 5px;
`;

const SubmitButton = styled.button`
  padding: 5px;
  background-color: #194070;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function ProjectList({ listaProyectos, actualizarProyectos, clickProyecto }) {

  const [selectedIdItem, setSelectedIdItem] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false); // Estado para controlar si el formulario de edición está abierto
  const [formProjectEdit, setFormEdit] = useState();
  const formRef = useRef(null);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setEditFormOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleClick = (index, projectId) => {
    setSelectedIdItem(index);
    clickProyecto(projectId);
  };


  const handleInfoClick = async (projectId) => {
    try {
      /*este metodo se va a cambiar por una api que traiga no solo el proyecto sino tambien la cantidad de tareas y usuarios relacionados, toda la info*/
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

  const handleDeleteClick = async (projectId, projectNombre) => {
    const confirmDelete = window.confirm(`¿Estás seguro que deseas borrar el proyecto ${projectNombre}?`);
    if (confirmDelete) {
      try {
        const response = await axios.put(`http://localhost:8080/proyecto/bajaProyecto/${projectId}`);
        actualizarProyectos();
        console.log("Proyecto eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar el proyecto", error);
        actualizarProyectos();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdit(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleEditClick = async (projectId) => {
      
      try {
        const response = await axios.get(`http://localhost:8080/proyecto/traerProyectoId/${projectId}`);
        setFormEdit(response.data);
        // Abre el formulario de edición
        setEditFormOpen(!editFormOpen);
      } catch (error) {
        console.error("Error al obtener los detalles del proyecto:", error);
      }
  
  };

  const handleSubmitEdit = async (e) => {
    // Aquí puedes enviar la solicitud de edición al servidor utilizando axios o cualquier otra biblioteca de solicitud HTTP
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/proyecto/editarProyecto/${formProjectEdit.id}/${formProjectEdit.nombre}/${formProjectEdit.descripcion}`);
      actualizarProyectos();
      console.log("Proyecto editado exitosamente");
    } catch (error) {
      console.error("Error al editar el proyecto", error);
      actualizarProyectos();
    }
    // Cierra el formulario de edición después de enviar
    setEditFormOpen(false);
  };
  
 
  return (
    <div>
      <Ul>
        {listaProyectos && listaProyectos.length > 0 ? (
          listaProyectos.map((proyectoObj, index) => (
            <Li
              key={proyectoObj.id}
              onClick={() => handleClick(index, proyectoObj.id)}
              clicked={index === selectedIdItem}
            >
              <Span title={proyectoObj.nombre}>{proyectoObj.nombre}</Span>
              {index === selectedIdItem && (
                <IconsContainer ref={formRef}>
                  <Info onClick={() => handleInfoClick(proyectoObj.id)} />
                  <Edit onClick={() => handleEditClick(proyectoObj.id)}/>
                  <Delete onClick={() => handleDeleteClick(proyectoObj.id, proyectoObj.nombre)}/>
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

      {/* Formulario de edición */}
      {editFormOpen &&  (
          <ContainerFormEdit>
            <EditForm onSubmit={handleSubmitEdit}>
              <Input type="text" name="nombre" value={formProjectEdit.nombre} onChange={handleChange} />
              <Input type="text" name="descripcion" value={formProjectEdit.descripcion} onChange={handleChange}/>
              <SubmitButton>Enviar</SubmitButton>
            </EditForm>
          </ContainerFormEdit>
        )}
      </div>
  
  );
}

export default ProjectList;
