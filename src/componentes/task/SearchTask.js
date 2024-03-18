import React, { useState } from 'react';
import styled from 'styled-components';
import { IoSearch } from "react-icons/io5";

// Estilos para el componente de búsqueda
const SearchContainer = styled.div`
  width: 70%;
  padding: 0;
`;

const SearchInput = styled.div`
  color: white;
  width: 40%;
  height: 30px;
  margin: 80px 0 20px 5px;
  border-radius: 5px;
  border: 1px solid;
  background-color: rgb(90, 90, 90);
  overflow-x: hidden; /* Muestra la barra de desplazamiento horizontal si el contenido es demasiado ancho */
  overflow-y: hidden; /* Oculta la barra de desplazamiento vertical */
  display: flex;
  align-items: center;
`;

const InputTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border: none; /* Añadir esta línea para eliminar el borde */
  padding: 0;
  background-color: transparent;
  color: white;
  font-size: 15px;
  outline: none; /* Añadir esta línea para eliminar el borde al enfocarse */
  &::placeholder {
    font-size: 15px;
    color: rgb(180, 180, 180);
  }
`;

const Lupita = styled(IoSearch)`
  font-size: 20px;
  margin-right: 10px;
`;

// Componente de búsqueda
function SearchTask({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    // Llamar a la función de búsqueda cada vez que cambia el valor del textarea
    onSearch(value);
  };

  return (
    <SearchContainer>
      <SearchInput>
        <InputTextarea
          placeholder="Buscar en este tablero"
          value={searchTerm}
          onChange={handleChange}
        />
        <Lupita />
      </SearchInput>
    </SearchContainer>
  );
};

export default SearchTask;