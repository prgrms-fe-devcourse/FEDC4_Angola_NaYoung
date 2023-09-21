import styled from '@emotion/styled';

const NotFoundPage = () => {
  return (
    <Container>
      <NouFoundContent>
        <NotFoundImage src="/images/default.png"></NotFoundImage>
        <NotFoundMsg>404 NOT FOUND</NotFoundMsg>
        <NouFoundSubMsg>
          <span>죄송합니다. 페이지를 찾을 수 없습니다.</span>
          <span>존재하지 않는 주소를 입력하셨거나,</span>
          <span>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</span>
        </NouFoundSubMsg>
      </NouFoundContent>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div``;

const NouFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
  top: 40px;
`;

const NotFoundImage = styled.img``;

const NotFoundMsg = styled.div`
  font-size: 30px;
  margin-bottom: 30px;
`;

const NouFoundSubMsg = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;
