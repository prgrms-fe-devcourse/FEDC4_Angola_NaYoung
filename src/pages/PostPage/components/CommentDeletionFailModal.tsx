import { Modal } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { DELETE_COMMENT } from '../constants';

const CommentDeletionFailModal = () => {
  return (
    <Modal onClose={() => window.location.reload()}>
      <Wrapper>{DELETE_COMMENT.FAIL_MSG}</Wrapper>
    </Modal>
  );
};

export default CommentDeletionFailModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
`;
