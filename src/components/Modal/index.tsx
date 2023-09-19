import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface ModalProps {
  onClose: VoidFunction;
  onConfirm?: VoidFunction;
  children: React.ReactNode;
}

const Modal = ({
  onClose: handleClose,
  onConfirm: handleConfirm,
  children,
}: ModalProps) => {
  const modalRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (handleConfirm && e.key === 'Enter') {
        e.preventDefault();
        handleConfirm();
      }
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClickModalContainer = (e: React.MouseEvent) => {
    if (e.target !== modalRef.current) {
      handleClose();
    }
  };
  return (
    <ModalWrapper onClick={(e) => handleClickModalContainer(e)}>
      <Container ref={modalRef}>
        <ModalHeader>
          <Button>
            <Icon
              name="close"
              size={ANGOLA_STYLES.textSize.text}
            />
          </Button>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalFooter>
          <Button>확인</Button>
          {handleConfirm && <Button>취소</Button>}
        </ModalFooter>
      </Container>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
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

const Container = styled.div`
  background-color: ${ANGOLA_STYLES.color.white};
  width: 400px;
  height: fit-content;
  padding: 20px;
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
  border: ${ANGOLA_STYLES.border.default};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 15px;
  border: ${ANGOLA_STYLES.border.default};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonXs.default};
  background-color: ${ANGOLA_STYLES.color.white};
  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonXs.hover};
    background-color: ${ANGOLA_STYLES.color.gray};
  }
  &:active {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonXs.default};
  }
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalFooter = styled.div``;
