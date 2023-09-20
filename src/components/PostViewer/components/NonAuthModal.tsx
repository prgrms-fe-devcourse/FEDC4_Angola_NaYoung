import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';
import Modal from '@components/Modal';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { NON_AUTH_MODAL } from '../constants';

interface NonAuthModal {
  onClose: () => void;
}

const NonAuthModal = ({ onClose: handleClose }: NonAuthModal) => {
  const linkButtonStyle = {
    fontSize: ANGOLA_STYLES.textSize.text,
    padding: '4px 8px',
    height: 'fit-content',
    width: 'fit-content',
  };
  return (
    <Modal
      onClose={handleClose}
      footerShow={false}>
      <>
        <Text>
          <h1>{NON_AUTH_MODAL.MODAL_TEXT.TITLE}</h1>
          <div>{NON_AUTH_MODAL.MODAL_TEXT.CONTENT}</div>
        </Text>
        <Bottom>
          <LinkButton
            to={'/login'}
            style={linkButtonStyle}>
            {NON_AUTH_MODAL.BUTTON_TEXT.LOGIN}
          </LinkButton>
          <LinkButton
            to={'/signup'}
            style={linkButtonStyle}>
            {NON_AUTH_MODAL.BUTTON_TEXT.SIGNUP}
          </LinkButton>
        </Bottom>
      </>
    </Modal>
  );
};

export default NonAuthModal;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  line-height: 120%;
`;
const Bottom = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;
