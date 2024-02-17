import styled from "styled-components";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, BrowserRouter as Router, Routes, Route, useNavigate  } from "react-router-dom";
import PrincipalBox from "./PrincipalBox";
import Body from "./BodyPrincipal";
import Home from "./Home";
import { UserContext } from './UserContext';

const Button = styled.button`
  margin-top: 10px;
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

const FormDiv = styled.div`
  padding: 40px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px; /* Añadir margen inferior para separar del resto del contenido */
  color: #2E931F;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px; /* Añadir margen inferior para separar del siguiente campo */
`;

const H4 = styled.h4`
  text-align: center;
`;

function Login() {
  
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
  });

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

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
            setUser(response.data)
            navigate('/home');
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert("usuario/contrasenia incorrecta")
        });
  };

  


  return (
    <Body>
      <PrincipalBox>
        <FormDiv>
          <form onSubmit={handleSubmit}>
            <Title>Bienvenido a INFINIT!</Title>
            <H4>Inicia Sesión para continuar</H4>

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
          
            <Button type="submit">Iniciar Sesión</Button>

          </form>
          <Link to="/register">
            <Button>Crear Cuenta</Button>
          </Link>
        </FormDiv>
      </PrincipalBox>

    
    </Body>
  );
}

export default Login;
