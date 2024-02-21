import styled from "styled-components";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from "react-router-dom";
import PrincipalBox from "./PrincipalBox";
import Body from "./BodyPrincipal";
import { UserContext } from './UserContext';
import { FaRegUser, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";

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

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px; /* Añadir margen inferior para separar del siguiente campo */
  padding-left: 30px; /* Añadir espacio a la izquierda para el icono */
`;

const IconUser = styled(FaRegUser)`
  position: absolute;
  top: 30%;
  left: 10px;
  transform: translateY(-50%);
`;

const IconPassword = styled(FaLock)`
  position: absolute;
  top: 30%;
  left: 10px;
  transform: translateY(-50%);
`;

const IconViewPass = styled(FaRegEyeSlash)`
  position: absolute;
  top: 30%;
  right: 0;
  transform: translateY(-50%);
`;

const P = styled.p`
  text-align: left;
`;

function Login() {
  
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
  });

  //para poder ver la contrasenia se crea un useState que controle el estado del tipo de input 
  const [verPassword, setVerPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // Función para manejar el clic en el ícono del ojo
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //para navegar entre rutas
  const navigate = useNavigate();

  //para tener acceso de setear el usuario en contexto
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
            //se setea el usuario en contexto por el usuario obtenido en el login correcto
            //el usuario nuevo queda guardado en una "constante" en todo el proyecto
            setUser(response.data)
            navigate('/home');
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert("usuario/contraseña incorrecta")
        });
  };

  const mostrarPassword = (e) =>{
    e.preventDefault();
    setVerPassword(!verPassword);
  }

  return (
    <Body>
      <PrincipalBox>
        <FormDiv>
          <form onSubmit={handleSubmit}>
            <Title>Bienvenido a INFINIT!</Title>
            <P>Inicia Sesión para continuar</P>
            
            <Label>Usuario</Label>
            <InputContainer>
              <IconUser />
              <Input
                type="text"
                name="usuario"
                placeholder=" usuario"
                value={formData.usuario}
                onChange={handleChange} 
              />
            </InputContainer>
            
            <Label>Contraseña</Label>
              <InputContainer>
                <IconPassword />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
                {/* Aquí cambiamos el icono según el estado de showPassword */}
                {showPassword ? (
                  <IconViewPass onClick={handleTogglePasswordVisibility} as={FaRegEye} />
                ) : (
                  <IconViewPass onClick={handleTogglePasswordVisibility} />
                )}
              </InputContainer>
          
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
