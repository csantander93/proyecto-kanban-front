import React, { useState } from "react";
import styled from "styled-components";

const Li = styled.li`
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  margin: 5px;
  background-color: #4B8AF0;
  border: 2px solid #4B8AF0;
  display: grid;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #b2d0f9;
  }
`;

const Ul = styled.ul`
  height: 100%;
  padding: 5px;
  margin: 0;
`;


function ProjectList({ listaProyectos }) {

  return (
    <Ul>
      {listaProyectos && listaProyectos.length > 0 && listaProyectos.map((proyectoObj, index) => (
        <Li key={proyectoObj.id}>{proyectoObj.nombre}</Li>
        ))}
    </Ul>
  );
}

export default ProjectList;
