import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import styled from '@emotion/styled';
import Spinner from '@components/Spinner';
import { useFetchCreatePost } from '@apis/post';
import { joinDataBySeparator } from '@utils/parseDataBySeparator';
import CreatePostSuccessModal from './CreatePostSuccessModal';

const CreatePostPage = () => {
  const [inputValues, setInputValues] = useState({
    title: '',
    optionA: '',
    optionB: '',
  });

  const {
    createPostMutate,
    isCreatePostLoading,
    isCreatePostSuccess,
    isCreatePostError,
  } = useFetchCreatePost();

  const handleChangeInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues({
      ...inputValues,
      [id]: value,
    });
  };

  const isCreatePostPossible: boolean =
    inputValues.title.length > 0 &&
    inputValues.optionA.length > 0 &&
    inputValues.optionB.length > 0;

  const handlePreventEnterKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSubmitCreatePost = (e: FormEvent) => {
    e.preventDefault();

    if (!isCreatePostPossible) return;

    const postTitle = joinDataBySeparator(
      inputValues.title,
      inputValues.optionA,
      inputValues.optionB,
    );

    createPostMutate({ title: postTitle });
  };

  return (
    <>
      {isCreatePostLoading ? (
        <Spinner size={100} />
      ) : (
        <StyledForm onSubmit={handleSubmitCreatePost}>
          <TitleInput
            id="title"
            placeholder="한 줄 설명 쓰기"
            value={inputValues.title}
            maxLength={100}
            onChange={handleChangeInputValues}
            onKeyDown={handlePreventEnterKeySubmit}
          />

          <ContentContainer>
            <OptionContainer>
              <OptionLabel>A 항목</OptionLabel>
              <OptionInput
                id="optionA"
                value={inputValues.optionA}
                maxLength={100}
                onChange={handleChangeInputValues}
                onKeyDown={handlePreventEnterKeySubmit}
              />
            </OptionContainer>

            <p>VS</p>

            <OptionContainer>
              <OptionLabel>B 항목</OptionLabel>
              <OptionInput
                id="optionB"
                value={inputValues.optionB}
                maxLength={100}
                onChange={handleChangeInputValues}
                onKeyDown={handlePreventEnterKeySubmit}
              />
            </OptionContainer>
          </ContentContainer>

          <ButtonWrapper>
            <StyledButton
              type="submit"
              disabled={!isCreatePostPossible}>
              작성 완료하기
            </StyledButton>
            {isCreatePostError && (
              <CreatePostFailText>
                포스트 작성에 실패했습니다 !
              </CreatePostFailText>
            )}
          </ButtonWrapper>
        </StyledForm>
      )}

      {isCreatePostSuccess && (
        <CreatePostSuccessModal postId="65005b6d583dc7337ffaf578" />
      )}
    </>
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

const OptionLabel = styled.label`
  box-sizing: border-box;
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  margin-top: 32px;
  border: 2px solid black;
  border-radius: 16px;
  width: 200px;
  height: 40px;
`;

const CreatePostFailText = styled.span`
  margin-top: 12px;
  color: red;
`;
