import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose: handleClose, children }: ModalProps) => {
  const modalRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleClickModalContainer = (e: React.MouseEvent) => {
    if (e.target !== modalRef.current) {
      handleClose();
    }
  };
  return (
    <ModalContainer onClick={(e) => handleClickModalContainer(e)}>
      <ModalContent ref={modalRef}>{children}</ModalContent>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  height: 400px;
  border-radius: 50px;
  border: 2px solid #000;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
`;
