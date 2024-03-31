import GlobalStyles from "../main/GlobalStyles";

import styled from "styled-components"

import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Loading from "../loading/Loading";


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
  const {user, setUser} = useContext(UserContext);
  const [usuarioAEditar, setUsuarioAEditar] = useState({ // Limpiar el formulario
    id: user.id,
    usuario: user.usuario,
    password: '',
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
  });
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //verifica si hay algun cambio realizado
  const [cambioRealizado, setCambioRealizado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioAEditar(prevState => ({
        ...prevState,
        [name]: value
    }));
    setCambioRealizado(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(cambioRealizado){
    setIsLoading(true);
   
    axios.put("http://localhost:8080/usuario/editarUsuario", usuarioAEditar)
        .then(response => {
            console.log('¡Datos enviados con éxito!', response.data);
            //se supone que debe devolver el usuario editado
            setUser(response.data);
            setUsuarioAEditar(
                {
                    id: user.id,
                    usuario: user.usuario,
                    password: '',
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                }
            );
            setRegistroExitoso(true); // Mostrar mensaje de éxito
            setIsLoading(false);
            setCambioRealizado(false);
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            setIsLoading(false);
            setCambioRealizado(false);
        });
    }else{
        window.alert("No se han realizado cambios para actualizar")
    }
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
       <Loading isLoading={isLoading}></Loading>
      <GlobalStyles/>
      <TitleEditar>Editar usuario</TitleEditar>
       <Formulario onSubmit={handleSubmit}>
       <Label>Usuario</Label>
              <Input
                type="text"
                name="usuario"
                placeholder="usuario"
                value={usuarioAEditar.usuario}
                onChange={handleChange}
              />

              <Label>Contraseña</Label>
              <Input
                type="password"
                name="password"
                placeholder="contraseña"
                value={usuarioAEditar.password}
                onChange={handleChange}
              />

              <Label>Nombre</Label>
              <Input
                type="text"
                name="nombre"
                placeholder="nombre"
                value={usuarioAEditar.nombre}
                onChange={handleChange}
              />

              <Label>Apellido</Label>
              <Input
                type="text"
                name="apellido"
                placeholder="apellido"
                value={usuarioAEditar.apellido}
                onChange={handleChange}
              />

              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                value={usuarioAEditar.email}
                onChange={handleChange}
              />

              <Button type="submit">Enviar</Button>
              {registroExitoso && <SuccessMessage>¡Cambio realizado correctamente!</SuccessMessage>}
            
            <Link to="/home">
              <Button>Volver</Button>
            </Link>
       </Formulario>
      </>
    )
    

}

export default EditProfile;