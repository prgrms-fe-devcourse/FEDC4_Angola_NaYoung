import styled from '@emotion/styled';
import Modal from '@components/Modal';
import { ANGOLA_STYLES } from '../../styles/commonStyles';

interface SignUpModalsProps {
  onClick: () => void;
}

export const SignUpSuccessModal = ({
  onClick: handleClick,
}: SignUpModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>회원 가입이 완료되었습니다!</Msg>
        {/* <button onClick={handleClick}>확인</button> */}
      </Content>
    </Modal>
  );
};

export const SignUpFailModal = ({
  onClick: handleClick,
}: SignUpModalsProps) => {
  return (
    <Modal onClose={handleClick}>
      <Content>
        <Msg>회원 가입에 실패하였습니다!</Msg>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  background-color: #fff;
  border-radius: 5px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const Msg = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
`;
