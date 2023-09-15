import styled from '@emotion/styled';
import TestComponent from '@pages/ReadMorePage/TestComponent';

const ReadMorePage = () => {
  return (
    <>
      <ReadMorePageContainer>
        <TestComponent />
      </ReadMorePageContainer>
    </>
  );
};

export default ReadMorePage;

const ReadMorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
