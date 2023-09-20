import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';
import Modal from '@components/Modal';
import { ANGOLA_STYLES } from '@styles/commonStyles';

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
          <LinkButton
            to={'/login'}
            style={linkButtonStyle}>
            로그인 바로가기
          </LinkButton>
          <LinkButton
            to={'/signup'}
            style={linkButtonStyle}>
            회원가입 바로가기
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
