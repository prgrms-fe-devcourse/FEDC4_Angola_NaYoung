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
      <Msg>{DELETE_COMMENT.TITLE}</Msg>
    </Modal>
  );
};

export default CommentDeletionModal;

const Msg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100px;
`;
