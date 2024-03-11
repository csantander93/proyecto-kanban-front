import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos para el componente de búsqueda
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  margin: 0;
`;

const SearchInput = styled.textarea`
  color: white;
  width: 100%;
  height: 20px;
  resize: none;
  margin: 10px 10px 10px 0;
  border-radius: 5px;
  background-color: rgb(90, 90, 90);
  overflow-x: hidden; /* Muestra la barra de desplazamiento horizontal si el contenido es demasiado ancho */
  overflow-y: hidden; /* Oculta la barra de desplazamiento vertical */
  white-space: nowrap; /* Evita que el texto se envuelva */
  &::placeholder {
    color: rgb(180, 180, 180);
  }
`;


const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #1d90cc;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #3da9d9;
  }
`;

// Componente de búsqueda
function SearchProject ({ onSearch }) {

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInput
        placeholder="Buscar proyecto..."
        value={searchTerm}
        onChange={handleChange}
      />
      <SearchButton onClick={handleSearch}>Ir</SearchButton>
    </SearchContainer>
  );
};

export default SearchProject;