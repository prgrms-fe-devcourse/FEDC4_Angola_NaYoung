import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';
import Modal from '@components/Modal';
import { NON_AUTH_MODAL } from '../constants';
import { linkButtonStyle } from '../style';

interface NonAuthModal {
  onClose: () => void;
}

const NonAuthModal = ({ onClose: handleClose }: NonAuthModal) => {
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
