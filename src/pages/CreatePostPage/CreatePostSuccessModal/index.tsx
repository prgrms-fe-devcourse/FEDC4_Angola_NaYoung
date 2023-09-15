import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';

interface CreatePostSuccessModalProps {
  postId: string | null;
}

const CreatePostSuccessModal = ({ postId }: CreatePostSuccessModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        navigate(`/post/${postId}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalContent>
        <ModalText>포스트 작성에 성공했습니다 !</ModalText>
        <LinkButton to={`/post/${postId}`}>확인</LinkButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default CreatePostSuccessModal;

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 32px;
  width: 360px;
  height: 200px;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: white;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.25);
`;

const ModalText = styled.p`
  font-size: 20px;
  margin-bottom: 32px;
`;
