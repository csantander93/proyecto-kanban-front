import React from "react";
import styled from "styled-components";

const ProyectoDiv = styled.div`
   position: fixed;
  left: 0;
  width: 200px; /* Ancho de la columna, ajusta según sea necesario */
  background-color: #f0f0f0; /* Color de fondo */
  border-right: 1px solid #ccc; /* Borde derecho opcional */
  padding: 20px; /* Espacio interno */
`;

function ListadoProyectos ({  listaProyectos  }){
    return(
        <ul>
        {listaProyectos && listaProyectos.length > 0 && listaProyectos.map((proyectoObj, index) => (
          <li key={proyectoObj.id}>{proyectoObj.nombre}</li>
        ))}
      </ul>
    );
}

export default ListadoProyectos;