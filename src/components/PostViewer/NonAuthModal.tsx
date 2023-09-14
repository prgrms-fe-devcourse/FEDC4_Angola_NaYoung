import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import LinkButton from '@components/NavBar/LinkButton';

interface NonAuthModal {
  onClose: () => void;
}

const NonAuthModal = ({ onClose: handleClose }: NonAuthModal) => {
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
    console.log('click');
    if (e.target !== modalRef.current) {
      handleClose();
    }
  };

  return (
    <ModalContainer onClick={(e) => handleClickModalContainer(e)}>
      <Modal ref={modalRef}>
        <Top>
          <div onClick={handleClose}>X</div>
        </Top>
        <Text>
          <h1>로그인을 해야 참여하실 수 있습니다!</h1>
          <div>
            그 외에도,
            <br />
            포스트 좋아요, 유저 팔로우, 알림,
            <br />
            등등의 기능을 사용할 수 있아요!
          </div>
        </Text>
        <Bottom>
          <LinkButton to={'/login'}>로그인</LinkButton>
          <LinkButton to={'/signup'}>회원가입</LinkButton>
        </Bottom>
      </Modal>
    </ModalContainer>
  );
};

export default NonAuthModal;

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
`;
const Modal = styled.div`
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
const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  > div {
    font-size: 30px;
  }
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const Bottom = styled.div`
  display: flex;
  gap: 10px;
`;
