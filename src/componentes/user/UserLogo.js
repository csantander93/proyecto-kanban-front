import styled from "styled-components"

const Perfil = styled.div `
  font-family: sans-serif;
  background-color: #1d90cc;
  width: 20px; /* Tamaño fijo del logo */
  height: 20px; /* Tamaño fijo del logo */
  display: flex;
  justify-content: center; /* Centra horizontalmente el contenido */
  align-items: center; /* Centra verticalmente el contenido */
  padding: 7px;
  font-weight: bold;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%; /* Hace que el contenedor sea redondo */
  &:hover {
    background-color: #276465;
  }
`;

const Texto = styled.div`
  font-size: 13px;
  color: #c9c9c9;
`;

  function UserLogo (props){
    
    const handleClick = () => {
      console.log("id "+props.id);
    }

    return(
        <Perfil onClick={() => handleClick()} title={props.usuario}><Texto>{props.nombre[0].toUpperCase()}{props.apellido[0].toUpperCase()}</Texto></Perfil>
    );
  }

  export default UserLogo; 