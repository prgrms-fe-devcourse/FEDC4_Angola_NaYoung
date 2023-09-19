import { ChangeEvent, FocusEvent, useState } from 'react';
import styled from '@emotion/styled';
import Spinner from '@components/Spinner';
import { useFetchCreatePost } from '@apis/post';
import { joinDataBySeparator } from '@utils/parseDataBySeparator';
import { ANGOLA_STYLES } from '@styles/commonStyles';
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
              placeholder="밸런스 포스트에 대한 한 줄 설명을 써주세요"
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
                placeholder="A 항목에 대한 설명을 작성해주세요"
              />
              <OptionLengthLimit>
                {inputValues.optionA.length} / 100
              </OptionLengthLimit>
            </OptionContent>

            <VsContainer>VS</VsContainer>

            <OptionContent>
              <OptionName>B 항목</OptionName>
              <OptionInput
                id="optionB"
                value={inputValues.optionB}
                maxLength={100}
                onChange={handleChangeInputValues}
                onBlur={handleBlurTrim}
                placeholder="B 항목에 대한 설명을 작성해주세요"
              />
              <OptionLengthLimit>
                {inputValues.optionB.length} / 100
              </OptionLengthLimit>
            </OptionContent>
          </OptionContainer>

          <SubmitButton
            disabled={!isCreatePostPossible}
            onClick={handleClickCreatePost}>
            작성 완료하기
          </SubmitButton>
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
  padding: 0px 24px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  align-self: stretch;
`;

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  padding: 20px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 32px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
`;

const TitleInput = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  width: 80%;
  color: ${ANGOLA_STYLES.color.text};
  line-height: 100%;

  &::placeholder {
    color: ${ANGOLA_STYLES.color.dark};
  }
`;

const TitleLengthLimit = styled.span`
  box-sizing: border-box;
  position: absolute;
  right: 28px;
  bottom: 22px;
  color: ${ANGOLA_STYLES.color.text};
  line-height: 100%;

  &::placeholder {
    color: ${ANGOLA_STYLES.color.dark};
  }
`;

const OptionContainer = styled.div`
  display: flex;
  padding: 12px 0px;
  align-items: center;
  gap: 36px;
  align-self: stretch;
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
`;

const OptionName = styled.p`
  box-sizing: border-box;
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
  line-height: 100%;
`;

const OptionInput = styled.textarea`
  box-sizing: border-box;
  display: flex;
  height: 256px;
  min-height: 256px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  outline: none;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  line-height: 38px; // TODO:MinwooP - 조정하기

  border-radius: 24px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.gray};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};

  &::placeholder {
    color: ${ANGOLA_STYLES.color.dark};
  }

  &:focus {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const OptionLengthLimit = styled.span`
  box-sizing: border-box;
  color: ${ANGOLA_STYLES.color.dark};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const VsContainer = styled.p`
  color: ${ANGOLA_STYLES.color.black};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.symbol};
`;

const SubmitButton = styled.button`
  display: flex;
  height: 56px;
  padding: 20px 36px;
  justify-content: center;
  align-items: center;

  border-radius: 44px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};

  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }

  &:disabled {
    background: ${ANGOLA_STYLES.color.dark};
  }
`;
