import styled from '@emotion/styled';
import Modal from '@components/Modal';
import { DELETE_COMMENT } from '../constants';

interface CommentDeletionModalProps {
  setIsClickedDeleteBtn: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDeleteCommentModalBtn: () => void;
}

const CommentDeletionModal = ({
  setIsClickedDeleteBtn,
  handleClickDeleteCommentModalBtn,
}: CommentDeletionModalProps) => {
  return (
    <Modal
      onClose={() => setIsClickedDeleteBtn(false)}
      onConfirm={handleClickDeleteCommentModalBtn}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <div>{DELETE_COMMENT.TITLE}</div>
      </ModalWrapper>
    </Modal>
  );
};

export default CommentDeletionModal;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  justify-content: space-around;
  align-items: center;
`;
