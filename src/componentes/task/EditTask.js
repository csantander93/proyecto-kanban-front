import React, { useState } from "react";
import styled from 'styled-components';
import axios from "axios";
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

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #c9c9c9;
`;

const FormTextarea = styled.textarea`
  width: 92%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #c9c9c9;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #c9c9c9;
`;

const FormButton = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function EditTask(props) {
  const [formData, setFormData] = useState({
    titulo: props.taskEdit.titulo,
    descripcion: props.taskEdit.descripcion,
    dificultad: props.taskEdit.dificultad,
    estado: props.taskEdit.estado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/tarea/editarTarea/${props.taskEdit.id}`, formData);
      console.log("Tarea editada exitosamente");
      props.fetchData();
    } catch (error) {
      console.error("Error al editar la tarea", error);
    }
  };

  return (
    <Draggable defaultPosition={props.defaultPosition}>
      <FormContainer>
        <FormTitle>Editar Tarea</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormField>
            <FormLabel>Título:</FormLabel>
            <FormInput type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
          </FormField>
          <FormField>
            <FormLabel>Descripción:</FormLabel>
            <FormTextarea name="descripcion" value={formData.descripcion} onChange={handleChange}></FormTextarea>
          </FormField>
          <FormField>
            <FormLabel>Dificultad:</FormLabel>
            <FormSelect name="dificultad" value={formData.dificultad} onChange={handleChange}>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </FormSelect>
          </FormField>
          <FormField>
            <FormLabel>Estado:</FormLabel>
            <FormSelect name="estado" value={formData.estado} onChange={handleChange}>
              <option value="PARA HACER">Para Hacer</option>
              <option value="EN PROCESO">En Proceso</option>
              <option value="FINALIZADO">Finalizado</option>
              <option value="EN REVISION">En revisión</option>
              <option value="APROBADO">Aprobado</option>
            </FormSelect>
          </FormField>
          <FormButton type="submit" onClick={handleSubmit}>Guardar Cambios</FormButton>
        </form>
      </FormContainer>
    </Draggable>
  );
}

export default EditTask;
