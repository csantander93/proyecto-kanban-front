import React from "react";
import styled from 'styled-components';

const Contenedor = styled.div`
  margin: 10px;
  padding-top: 10px;
  width: 90%;
  min-height: auto;
  background-color: aliceblue;
  border-radius: 5px;
  border: 1px solid red;
  color: black;
  display: grid;
  flex-direction: column;
  

`;

const Span = styled.span`
 text-align: center;
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