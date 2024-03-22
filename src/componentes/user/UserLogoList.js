import axios from "axios";
import { useEffect, useState } from "react";
import UserLogo from "./UserLogo";
import styled from "styled-components";

const Div = styled.div`
 display: flex;
  align-items: center;
`;

const Span = styled.span`
    font-size: 20px;
    font-family: sans-serif;
    color: #c9c9c9;
    margin-left: 5px;
    font-weight: bold;
`;

function UserLogoList(props){
    const [userList, setUserList] = useState([]);
    const fetchApiUsersInProject = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/usuario/traerUsuariosPorIdProyecto/${props.idProyecto}`
          );
          setUserList(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error al obtener listado de usuarios por proyecto:", error);
        }
    };

    useEffect(() => {

        fetchApiUsersInProject();

    }, [props.idProyecto]);

    return(
        <Div>
            {userList.map((user, index) =>{
                return <UserLogo
                usuario = {user.usuario}
                nombre = {user.nombre} 
                apellido = {user.apellido}
                />
            }
            )}
            <Span>{userList.length}</Span>
        </Div>
    );
}

export default UserLogoList;