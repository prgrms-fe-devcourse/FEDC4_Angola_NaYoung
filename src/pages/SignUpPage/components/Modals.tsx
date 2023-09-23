import styled from '@emotion/styled';
import Modal from '@components/Modal';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { MODAL } from '../constants';

interface ModalsProps {
  onClick: VoidFunction;
}

export const SignUpSuccessModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal
      onClose={handleClick}
      footerShow={false}>
      <Content>
        <Msg>{MODAL.MSG.SIGN_UP.SUCCESS}</Msg>
        <SubMsg>{MODAL.SUB_MSG}</SubMsg>
      </Content>
    </Modal>
  );
};

export const SignUpFailModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal
      onClose={handleClick}
      footerShow={false}>
      <Content>
        <Msg>{MODAL.MSG.SIGN_UP.FAIL}</Msg>
        <SubMsg>{MODAL.SUB_MSG}</SubMsg>
      </Content>
    </Modal>
  );
};

export const CheckEmailModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal
      onClose={handleClick}
      footerShow={false}>
      <Content>
        <Msg>{MODAL.MSG.WARN.EMAIL}</Msg>
        <SubMsg>{MODAL.SUB_MSG}</SubMsg>
      </Content>
    </Modal>
  );
};

export const CheckPasswordModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal
      onClose={handleClick}
      footerShow={false}>
      <Content>
        <Msg>{MODAL.MSG.WARN.PASSWORD}</Msg>
        <SubMsg>{MODAL.SUB_MSG}</SubMsg>
      </Content>
    </Modal>
  );
};

export const CheckFullNameModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal
      onClose={handleClick}
      footerShow={false}>
      <Content>
        <Msg>{MODAL.MSG.WARN.FULLNAME}</Msg>
        <SubMsg>{MODAL.SUB_MSG}</SubMsg>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
  gap: 2rem;
`;

const Msg = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
`;

const SubMsg = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.text};
  color: ${ANGOLA_STYLES.color.dark};
`;
