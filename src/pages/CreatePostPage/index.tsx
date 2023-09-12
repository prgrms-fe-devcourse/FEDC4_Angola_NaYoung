import styled from '@emotion/styled';

const CreatePostPage = () => {
  return (
    <StyledForm>
      <TitleInput placeholder="한 줄 설명 쓰기" />

      <ContentContainer>
        <OptionContainer>
          <label>A 항목</label>
          <OptionInput />
        </OptionContainer>

        <p>VS</p>

        <OptionContainer>
          <label>B 항목</label>
          <OptionInput />
        </OptionContainer>
      </ContentContainer>

      <StyledButton>작성 완료하기</StyledButton>
    </StyledForm>
  );
};

export default CreatePostPage;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const TitleInput = styled.input`
  margin-top: 32px;
  border: 2px solid black;
  border-radius: 16px;
  outline: none;
  width: 100%;
  padding: 6px 12px;
`;

const ContentContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const OptionInput = styled.div`
  border: 2px solid black;
  border-radius: 16px;
  outline: none;
  width: 300px;
  height: 200px;
`;

const StyledButton = styled.button`
  margin-top: 32px;
  border: 2px solid black;
  border-radius: 16px;
`;
