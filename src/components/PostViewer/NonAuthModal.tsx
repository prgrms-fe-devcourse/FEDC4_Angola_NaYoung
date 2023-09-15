import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';
import Modal from '@components/Modal';

interface NonAuthModal {
  onClose: () => void;
}

const NonAuthModal = ({ onClose: handleClose }: NonAuthModal) => {
  return (
    <Modal onClose={handleClose}>
      <>
        <Top>
          <div onClick={handleClose}>X</div>
        </Top>
        <Text>
          <h1>로그인을 해야 참여하실 수 있습니다!</h1>
          <div>
            그 외에도,
            <br />
            포스트 좋아요, 유저 팔로우, 알림,
            <br />
            등등의 기능을 사용할 수 있아요!
          </div>
        </Text>
        <Bottom>
          <LinkButton to={'/login'}>로그인</LinkButton>
          <LinkButton to={'/signup'}>회원가입</LinkButton>
        </Bottom>
      </>
    </Modal>
  );
};

export default NonAuthModal;

const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  > div {
    font-size: 30px;
  }
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const Bottom = styled.div`
  display: flex;
  gap: 10px;
`;
