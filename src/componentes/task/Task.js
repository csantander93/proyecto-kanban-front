import React from "react";
import styled from 'styled-components';

const Contenedor = styled.div`
  margin: 5px 10px 5px 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 90%;
  min-height: auto;
  background-color: aliceblue;
  border-radius: 5px;
  border: none;
  color: black;
  display: grid;
  flex-direction: column;
  background-color: rgba(90, 90, 90, 0.5);
  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
 margin-left: 5px;
 color: #c9c9c9;
 text-align: left;
`;

const P = styled.p`
`;


function Task (props){
    return(
        <Contenedor>
           <Span>{props.titulo}</Span>
        </Contenedor>
    );
}

export default Task;