import styled from "styled-components";
import React, { useState } from 'react';
import axios from 'axios';
import Register from "./Register";

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: #339966;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3BB377;
  }
  &:active {
    background-color: #48C084;
  }
`;

const PrincipalBox = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Opcional: hace que el contenedor ocupe toda la altura de la pantalla */
  background-color: #eef;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Agregar sombreado */
  width: 300px; /* Ajustar el ancho del formulario */
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px; /* Añadir margen inferior para separar del resto del contenido */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px; /* Añadir margen inferior para separar del siguiente campo */
`;

function Login() {
  
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/login", formData)
        .then(response => {
            console.log('¡Datos enviados con éxito!', response.data);
            alert("logueado correctamente")
            // Puedes realizar otras acciones después de enviar los datos, como redireccionar a otra página
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
        });
  };

  return (
    <PrincipalBox>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Title>Ingresar</Title>
          <Label>Usuario</Label>
          <Input type="text" name="usuario" value={formData.usuario} onChange={handleChange} />

          <Label>Contraseña</Label>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} />

          <Button type="submit">Login</Button>
        </form>
        <Register></Register>
      </FormContainer>
    </PrincipalBox>
  );
}

export default Login;
