import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  position: absolute;
  top: calc(42% + 5px);
  left: calc(10% + 20px);
  z-index: 1000;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 150px;
`;

const Ul = styled.ul`
 color: white;
 position: absolute;
 background-color:  #0F0F0F;
 margin: 0;
 margin-top: 3px;
 padding: 0;
 width: 100%;
 min-height: 400%;
 max-height: 800%;
 border-radius: 5px;
 box-shadow: 0px 0px 5px 1px #c9c9c9;
 overflow-y: auto;
  /* Estilo para el contenedor del scroll */
  &::-webkit-scrollbar {
   width: 10px;
 }

 /* Estilo para la barra de scroll */
 &::-webkit-scrollbar-thumb {
   background: #888; 
   border-radius: 10px;
 }

 /* Estilo para la barra de scroll cuando se pasa el mouse por encima */
 &::-webkit-scrollbar-thumb:hover {
   background: #555; 
 }
`;

const UserListItem = styled.li`
  margin-bottom: 0px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
  color: #c9c9c9;
  width: 100%;
  list-style: none;
  border-radius: 5px;
  &:hover {
    background-color:#545454;
  }
`;

const Button = styled.button` 
  background-color: #126b78;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #00d2db;
  }
  &:active {
    background-color: #3da9d9;
  }
`;

const AddUserToTask = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchApiUsersTerm = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/usuario/traerUsuariosDeProyectoSinTarea/${searchTerm}/${props.idProyecto}/${props.idTarea}`);
        setUserList(response.data);
    } catch (error) {
      console.error("Error al obtener listado de usuarios por terminacion:", error);
    }
  };

  useEffect(() => {
    if (selectedUser && selectedUser.usuario !== searchTerm) {
      setSelectedUser(null);
    }

    if(searchTerm !== "" && !selectedUser){
      fetchApiUsersTerm();
    }

  }, [searchTerm, props.idProyecto, props.idTarea]);

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    setUserList([]);
    setSearchTerm(user.usuario);
  };

  return (
    <Container>
      <div>
      <Input
        type="text"
        value={searchTerm}
        placeholder="Buscar usuario..."
        onFocus={() => setIsDropdownOpen(true)}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button>Enviar</Button>
      </div>
      {isDropdownOpen && searchTerm !== "" && userList.length > 0 &&(
        <Ul>
          {userList.map((user) => (
            <UserListItem key={user.id} onClick={() => handleUserSelect(user)}>
              {user.usuario}
            </UserListItem>
          ))}
        </Ul>
      )}
    </Container>
  );
};

export default AddUserToTask;
