import React, { useState } from "react";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { FiInfo } from "react-icons/fi";

const Li = styled.li`
  position: relative; /* Para que los iconos absolutos se posicionen relativos a este */
  color: ${props => props.clicked ? "#9fffff" : "#c9c9c9"};
  background-color: ${props => props.clicked ? "#194070" : "none"};
  overflow: hidden;
  white-space: nowrap;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 13px;
  margin: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 3px 3px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translate(10px);
    background-color: #194070;
  }
`;

const Ul = styled.ul`
  height: 100%;
  padding: 0;
  margin: 0;
`;

const P = styled.p`
  padding-top: 50px;
  color: #c9c9c9;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 13px;
  text-align: center;
`;

const IconsContainer = styled.div`
  position: absolute;
  right: 5px; /* Ajusta la posición de los iconos */
  display: flex;
`;

const Info = styled(FiInfo)`
  margin-left: 6px;
  &:hover {
    font-size: 15px;
  }
`;

const Edit = styled(GrEdit)`
  margin-left: 6px;
  &:hover {
    font-size: 15px;
  }
`;

const Delete = styled(RiDeleteBin6Line)`
  margin-left: 6px;
  &:hover {
    font-size: 15px;
  }
`;

const Span = styled.span`
  margin-right: 24px; /* Ajusta el margen derecho para dejar espacio para los iconos */
  max-width: 150px; /* Establece la longitud máxima */
  overflow: hidden;
  text-overflow: ellipsis; /* Añade los tres puntos si el texto es muy largo */
`;

function ProjectList({ listaProyectos }) {
  const [selectedIdItem, setSelectedIdItem] = useState(null);

  const handleClick = (index) => {
    setSelectedIdItem(index);
  };

  return (
    <Ul>
      {listaProyectos && listaProyectos.length > 0 ? (
        listaProyectos.map((proyectoObj, index) => (
          <Li
            key={proyectoObj.id}
            onClick={() => handleClick(index)}
            clicked={index === selectedIdItem}
          >
            <Span title={proyectoObj.nombre}>{proyectoObj.nombre}</Span>
            {index === selectedIdItem && (
              <IconsContainer>
                <Info />
                <Edit />
                <Delete />
              </IconsContainer>
            )}
          </Li>
        ))
      ) : (
        <P>No hay proyectos disponibles</P>
      )}
    </Ul>
  );
}

export default ProjectList;
