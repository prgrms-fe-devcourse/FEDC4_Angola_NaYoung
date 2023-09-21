import styled from '@emotion/styled';

const NotFoundPage = () => {
  return (
    <div>
      <NouFoundContent>
        <NotFoundImage src="/images/angola_404.svg"></NotFoundImage>
        <NotFoundMsgContainer>
          <NotFoundMsg>404 NOT FOUND</NotFoundMsg>
          <NouFoundSubMsg>
            <span>죄송합니다. 페이지를 찾을 수 없습니다.</span>
            <span>존재하지 않는 주소를 입력하셨거나,</span>
            <span>
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </span>
          </NouFoundSubMsg>
        </NotFoundMsgContainer>
      </NouFoundContent>
    </div>
  );
};

export default NotFoundPage;

const NouFoundContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
  top: 80px;
  gap: 80px;
`;

const NotFoundImage = styled.img`
  width: 260px;
`;

const NotFoundMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NotFoundMsg = styled.div`
  font-size: 40px;
  margin-bottom: 30px;
`;

const NouFoundSubMsg = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;
