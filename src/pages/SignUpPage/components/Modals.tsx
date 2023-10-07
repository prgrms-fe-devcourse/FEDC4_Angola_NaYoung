import { Modal } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { MODAL } from '../constants';

interface ModalsProps {
  onClick: VoidFunction;
}

export const SignUpSuccessModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>{MODAL.MSG.SIGN_UP.SUCCESS}</Msg>
      </Content>
    </Modal>
  );
};

export const SignUpFailModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>{MODAL.MSG.SIGN_UP.FAIL}</Msg>
      </Content>
    </Modal>
  );
};

export const CheckEmailModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>{MODAL.MSG.WARN.EMAIL}</Msg>
      </Content>
    </Modal>
  );
};

export const CheckPasswordModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>{MODAL.MSG.WARN.PASSWORD}</Msg>
      </Content>
    </Modal>
  );
};

export const CheckFullNameModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>{MODAL.MSG.WARN.FULL_NAME}</Msg>
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

  @media screen and (max-width: 400px) {
    padding: 10px 0;
  }
`;

const Msg = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleLg};

  @media screen and (max-width: 400px) {
    font-size: ${ANGOLA_STYLES.textSize.titleSm};
  }
`;
