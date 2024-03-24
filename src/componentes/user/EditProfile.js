import GlobalStyles from "../main/GlobalStyles";

import styled from "styled-components"

import { Link } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Formulario = styled.form`
font-family: sans-serif;
 
 background-color: rgba(30 30 30 / 20%);
  backdrop-filter: blur(10px);
    width: 300px; /* ajusta el ancho del formulario según sea necesario */
    padding: 20px; /* añade espacio alrededor del contenido */
    border-radius: 10px; /* añade bordes redondeados */
    display: flex;
    flex-direction: column;
    justify-content: center; /* centra verticalmente el contenido */
    align-items: center; /* centra horizontalmente el contenido */
    margin: auto; /* centrado horizontal */
    margin-top: 50px; /* ajusta la separación del borde superior */
     box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.4); /* Ajusta los valores según sea necesario */

`

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1d90cc;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: rgba(30 30 30 / 20%);
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1); 
  cursor: pointer;
  &:hover {
    background-color: #3da9d9;
  }
  &:active {
    background-color: #3da9d9;
  }
`;
const SuccessMessage = styled.div`
  color: green;
  text-align: center;
`;
export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: white;
`;

const TitleEditar = styled.h1`
  text-align: center;
  color: white;
`;
export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: white;
`;

export const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  font-family: sans-serif;
  &:focus {
    border-color: blue;
    outline: none;
  }
`;


function EditProfile() {

  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
  });

  const [enviandoPeticion, setEnviandoPeticion] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviandoPeticion(true);

    axios.put("http://localhost:8080/usuario/editarUsuario", formData)
        .then(response => {
            console.log('¡Datos enviados con éxito!', response.data);
            setRegistroExitoso(true); // Mostrar mensaje de éxito
            setFormData({ // Limpiar el formulario
              usuario: '',
              password: '',
              nombre: '',
              apellido: '',
              email: '',
            });
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
        })
        .finally(() => {
            setEnviandoPeticion(false);
        });
  };
  // useEffect(()=> {
  //   axios.get("http://localhost:8080/usuario/registro")
  //        .then(response =>{
  //         setFormData(response.data);
  //        })
  //        .catch(error =>{
  //         console.error('Error al obtener los datos del perfil:', error);
  //        });
  // },[]);
 
    return(
      <>
      <GlobalStyles/>
      <TitleEditar>Editar usuario</TitleEditar>
       <Formulario onSubmit={handleSubmit}>
       <Label>Usuario</Label>
              <Input
                type="text"
                name="usuario"
                placeholder="usuario"
                value={formData.usuario}
                onChange={handleChange}
              />

              <Label>Contraseña</Label>
              <Input
                type="password"
                name="password"
                placeholder="contraseña"
                value={formData.password}
                onChange={handleChange}
              />

              <Label>Nombre</Label>
              <Input
                type="text"
                name="nombre"
                placeholder="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />

              <Label>Apellido</Label>
              <Input
                type="text"
                name="apellido"
                placeholder="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />

              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Button type="submit" disabled={enviandoPeticion}>Enviar</Button>
              {registroExitoso && <SuccessMessage>¡Cambio realizado correctamente!</SuccessMessage>}
            
            <Link to="/home">
              <Button>Volver</Button>
            </Link>
       </Formulario>
      </>
    )
    

}

export default EditProfile;