import React, { useState } from "react";
import styled from "styled-components";

const Li = styled.li`
  color: ${props => props.clicked ? "#9fffff" : "#c9c9c9"} ;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: 13px;
  margin: 1px;
  display: grid;
  padding: 2px 3px 3px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  background-color:${props => props.clicked ? "#194070" : null} ;
  cursor: pointer;
  &:hover {
    background-color: #194070;
  }
`;

const Ul = styled.ul`
  height: 100%;
  padding: 0;
  margin: 0;
`;


function ProjectList({ listaProyectos }) {

  const [selectedIdItem, setSelectedIdItem] = useState(null);

  const handleClick = (index) => {
    setSelectedIdItem(index);
  }

  return (
    <Ul>
      {listaProyectos && listaProyectos.length > 0 && listaProyectos.map((proyectoObj, index) => (
        <Li
           key={proyectoObj.id}
           onClick={() => handleClick(index)}
           clicked = {index === selectedIdItem}>
          {proyectoObj.nombre}
        </Li>
        ))}
    </Ul>
  );
}

export default ProjectList;
