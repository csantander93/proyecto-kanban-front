import React from "react";
import styled from 'styled-components';

const DivTabla = styled.div`
display: table;
width: 100%;
height: 100%;
position: fixed;
border: 1px solid #000;
  `;

function TaskBoard () {
    return (
        <DivTabla>
            <div style={{display: 'table-row'}}>
            <div style={{display: 'table-cell', border: '1px solid #000', padding: '10px'}}>Celda 1</div>
            <div style={{display: 'table-cell', border: '1px solid #000', padding: '10px'}}>Celda 2</div>
            </div>
        </DivTabla>
    );
}

export default TaskBoard;
