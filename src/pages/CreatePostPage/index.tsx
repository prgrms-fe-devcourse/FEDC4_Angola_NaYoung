import { ChangeEvent, FocusEvent, useState } from 'react';
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
    createPostData,
    isCreatePostLoading,
    isCreatePostSuccess,
    isCreatePostError,
  } = useFetchCreatePost();

  const isCreatePostPossible: boolean =
    inputValues.title.length > 0 &&
    inputValues.optionA.length > 0 &&
    inputValues.optionB.length > 0;

  const handleChangeInputValues = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setInputValues({
      ...inputValues,
      [id]: value,
    });
  };

  const handleClickCreatePost = () => {
    if (!isCreatePostPossible) return;

    const postTitle = joinDataBySeparator(
      inputValues.title,
      inputValues.optionA,
      inputValues.optionB,
    );

    createPostMutate({ title: postTitle });
  };

  const handleBlurTrim = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setInputValues({
      ...inputValues,
      [id]: value.trim(),
    });
  };

  return (
    <>
      {isCreatePostLoading ? (
        <Spinner size={100} />
      ) : (
        <PageContainer>
          <TitleContainer>
            <TitleInput
              id="title"
              placeholder="한 줄 설명 쓰기"
              value={inputValues.title}
              maxLength={100}
              onChange={handleChangeInputValues}
              onBlur={handleBlurTrim}
            />
            <TitleLengthLimit>
              {inputValues.title.length} / 100
            </TitleLengthLimit>
          </TitleContainer>

          <OptionContainer>
            <OptionContent>
              <OptionName>A 항목</OptionName>
              <OptionInput
                id="optionA"
                value={inputValues.optionA}
                maxLength={100}
                onChange={handleChangeInputValues}
                onBlur={handleBlurTrim}
              />
            </OptionContent>

            <p>VS</p>

            <OptionContent>
              <OptionName>B 항목</OptionName>
              <OptionInput
                id="optionB"
                value={inputValues.optionB}
                maxLength={100}
                onChange={handleChangeInputValues}
                onBlur={handleBlurTrim}
              />
            </OptionContent>
          </OptionContainer>

          <ButtonContainer>
            <StyledButton
              disabled={!isCreatePostPossible}
              onClick={handleClickCreatePost}>
              작성 완료하기
            </StyledButton>
            {isCreatePostError && (
              <CreatePostFailText>
                포스트 작성에 실패했습니다 !
              </CreatePostFailText>
            )}
          </ButtonContainer>
        </PageContainer>
      )}

      {isCreatePostSuccess && (
        <CreatePostSuccessModal
          postId={createPostData === undefined ? null : createPostData}
        />
      )}
    </>
  );
};

export default CreatePostPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  margin-top: 32px;
  border: 2px solid black;
  border-radius: 16px;
  width: 80%;
`;
const TitleInput = styled.input`
  border: none;
  outline: none;
  width: 80%;
  padding: 6px 12px;
`;

const TitleLengthLimit = styled.span`
  box-sizing: border-box;
`;

const OptionContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OptionName = styled.p`
  box-sizing: border-box;
`;

const OptionInput = styled.textarea`
  box-sizing: border-box;
  padding: 20px;
  margin-top: 12px;
  border: 2px solid black;
  border-radius: 16px;
  outline: none;
  width: 300px;
  height: 200px;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
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
