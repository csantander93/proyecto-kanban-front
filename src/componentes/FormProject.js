import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdOutlineLibraryAdd } from 'react-icons/md';

const ButtonAddProject = styled(MdOutlineLibraryAdd)`
  margin-left: 42%;
  font-size: 30px;
  color: white;
  cursor: pointer;
  &:hover {
    font-size: 33px;
    transition: ease-in-out 0.1s;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8); /* Fondo opaco */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #339966;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function FormProject() {

  const [abrirFormulario, setAbrirFormulario] = useState(false);

  const handleButtonClick = () => {
    setAbrirFormulario(!abrirFormulario);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    <>
      <ButtonAddProject onClick={handleButtonClick} />
        {abrirFormulario && (
        <Overlay>
          <FormContainer>
           <FormTitle>Ingrese los datos del proyecto</FormTitle>
            <Form onSubmit={handleSubmit}>
             <Label htmlFor="name">Nombre:</Label>
             <Input type="text" id="name" name="name" required />

             <Label htmlFor="description">Descripción:</Label>
             <Input type="text" id="description" name="description" required />

            <Button type="submit">Enviar</Button>
          </Form>
        </FormContainer>
        </Overlay>
        )}
      
          
    </>
  );
}

export default FormProject;
