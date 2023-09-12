import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import styled from '@emotion/styled';

const CreatePostPage = () => {
  const [inputValues, setInputValues] = useState({
    title: '',
    optionA: '',
    optionB: '',
  });

  const handleChangeInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues({
      ...inputValues,
      [id]: value,
    });
  };

  const isMakePostPossible: boolean =
    inputValues.title.length > 0 &&
    inputValues.optionA.length > 0 &&
    inputValues.optionB.length > 0;

  const handleEnterKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSubmitMakePost = (e: FormEvent) => {
    e.preventDefault();
    console.log('전송합니다');
  };

  return (
    <StyledForm onSubmit={handleSubmitMakePost}>
      <TitleInput
        id="title"
        placeholder="한 줄 설명 쓰기"
        value={inputValues.title}
        maxLength={100}
        onChange={handleChangeInputValues}
        onKeyDown={handleEnterKeySubmit}
      />

      <ContentContainer>
        <OptionContainer>
          <label>A 항목</label>
          <OptionInput
            id="optionA"
            value={inputValues.optionA}
            maxLength={100}
            onChange={handleChangeInputValues}
            onKeyDown={handleEnterKeySubmit}
          />
        </OptionContainer>

        <p>VS</p>

        <OptionContainer>
          <label>B 항목</label>
          <OptionInput
            id="optionB"
            value={inputValues.optionB}
            maxLength={100}
            onChange={handleChangeInputValues}
            onKeyDown={handleEnterKeySubmit}
          />
        </OptionContainer>
      </ContentContainer>

      <StyledButton
        type="submit"
        disabled={!isMakePostPossible}>
        작성 완료하기
      </StyledButton>
    </StyledForm>
  );
};

export default CreatePostPage;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
`;

const TitleInput = styled.input`
  margin-top: 32px;
  border: 2px solid black;
  border-radius: 16px;
  outline: none;
  width: 80%;
  padding: 6px 12px;
`;

const ContentContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const OptionInput = styled.input`
  box-sizing: border-box;
  padding: 20px;
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
  width: 20%;
  height: 40px;
`;
