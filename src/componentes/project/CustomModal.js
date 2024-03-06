import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  padding: 20px;
  max-width: 400px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f0f0f0;
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

function CustomModal({ isOpen, onRequestClose, contentLabel, children }) {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <CloseButton onClick={onRequestClose}>X</CloseButton>
      {children}
    </ModalContainer>
  );
}

export default CustomModal;