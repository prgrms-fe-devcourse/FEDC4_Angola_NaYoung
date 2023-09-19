import styled from '@emotion/styled';
import Modal from '@components/Modal';
import { ANGOLA_STYLES } from '../../styles/commonStyles';

interface ModalsProps {
  onClick: () => void;
}

export const SignUpSuccessModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>회원 가입이 완료되었습니다!</Msg>
        <SubMsg>Enter/Esc 또는 주변을 클릭하세요.</SubMsg>
      </Content>
    </Modal>
  );
};

export const SignUpFailModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>회원 가입에 실패하였습니다!</Msg>
        <SubMsg>Enter/Esc 또는 주변을 클릭하세요.</SubMsg>
      </Content>
    </Modal>
  );
};

export const CheckEmailModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>이메일 중복 검사를 해주세요!</Msg>
        <SubMsg>Enter/Esc 또는 주변을 클릭하세요.</SubMsg>
      </Content>
    </Modal>
  );
};

export const CheckPasswordModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>비밀번호를 다시 확인해주세요!</Msg>
        <SubMsg>Enter/Esc 또는 주변을 클릭하세요.</SubMsg>
      </Content>
    </Modal>
  );
};

export const CheckFullNameModal = ({ onClick: handleClick }: ModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>닉네임 중복 검사를 해주세요!</Msg>
        <SubMsg>Enter/Esc 또는 주변을 클릭하세요.</SubMsg>
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
  gap: 3rem;
`;

const Msg = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
`;

const SubMsg = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.text};
  color: ${ANGOLA_STYLES.color.dark};
`;
