import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";

const ModalContainer = styled.div`
  position: fixed;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  padding: 20px;
  max-width: 400px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: red;
    border: solid 1px black;
  }
`;

function CustomModal({ isOpen, onRequestClose, children }) {
  if (!isOpen) return null;

  return (
    <Draggable defaultPosition={{x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 500}}>
      <ModalContainer>
        <CloseButton onClick={onRequestClose}>X</CloseButton>
        {children}
      </ModalContainer>
    </Draggable>
  );
}

export default CustomModal;
