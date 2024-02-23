import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Esto hace que el fondo sea negro y semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Asegura que el overlay esté en la parte superior */
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
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

const DivCreate = styled.div `
  margin-bottom: 10px;
  padding: 3px;
  border: solid 1px rgba(255,255,255,0.3);
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: white;

`;

const Span = styled.span `
  font-size: 0.8em;
  font-family: sans-serif;

`;

const ButtonAddProject = styled(MdOutlineLibraryAdd)`
  margin-left: 70px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    font-size: 22px;
    transition: ease-in-out 0.1s;
  }
`;

  function FormProject(props) {
 // CONSUMIR API

 //para obtener el usuario en contexto, osea el usuario logueado
 //para que se renderice la lista de proyectos
    const { user } = useContext(UserContext);
    const dataInicial = {
      idUsuario: user.id,
      nombre: '',
      descripcion: ''
    }
    const [formData, setFormData] = useState(dataInicial);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8080/proyecto/crear", formData)
      .then(response => {
          console.log('¡Datos enviados con éxito!', response.data);
          alert('Se registro nuevo proyecto');
          setAbrirFormulario(false)
          setFormData(dataInicial)
          props.actualizarProyectos();
         
      })
      .catch(error => {
          console.error('Error al enviar los datos:', error);
          alert("No se puede enviar el formulario")
      });
    };

    //MOSTRAR EL FORMULARIO

  const [abrirFormulario, setAbrirFormulario] = useState(false);

  const formRef = useRef();

  const handleButtonClick = () => {
    setAbrirFormulario(true);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setAbrirFormulario(false);
    }
  }

    useEffect(() => {
      
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []); 

  
     
  return (
    <>
    <DivCreate><Span>Crear proyecto</Span>
    <ButtonAddProject onClick={handleButtonClick} />
    </DivCreate>
        {abrirFormulario && (
        <Overlay>
          <FormContainer ref={formRef}>
           <FormTitle>Ingrese los datos del proyecto</FormTitle>
            <Form onSubmit={handleSubmit}>
             <Label htmlFor="name">Nombre:</Label>
             <Input type="text" id="name" name="nombre" required
              value={formData.nombre}
              onChange={handleChange}  />

             <Label htmlFor="description">Descripción:</Label>
             <Input type="text" id="description" name="descripcion" required 
             value={formData.descripcion}
             onChange={handleChange}/>

            <Button type="submit">Enviar</Button>
          </Form>
        </FormContainer>
        </Overlay>
        )}
      
          
    </>
  );
}


export default FormProject;