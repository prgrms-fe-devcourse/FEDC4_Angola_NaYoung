import { Icon, Modal, Spinner } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { COLOR, ID, MAX_INPUT_LENGTH, PLACEHOLDER, TEXT } from './constants';
import { useCreatePost } from './hooks';

const CreatePostPage = () => {
  const {
    inputValues,
    isModalOpen,
    setIsModalOpen,
    isMaxLineInput,
    isCreatePostLoading,
    isCreatePostPossible,
    handleChangeTitleValue,
    handleChangeOptionValues,
    handleClickCreatePost,
    handleBlurTrim,
  } = useCreatePost();

  if (isCreatePostLoading) {
    return <Spinner size={100} />;
  }

  return (
    <>
      <PageContainer>
        <TitleContainer>
          <TitleInput
            placeholder={PLACEHOLDER.TITLE}
            value={inputValues.title}
            onChange={handleChangeTitleValue}
            onBlur={handleBlurTrim}
          />
          <TitleLengthLimit>
            {inputValues.title.length} / {MAX_INPUT_LENGTH}
          </TitleLengthLimit>
        </TitleContainer>

        <OptionContainer>
          <OptionContent>
            <OptionName>{TEXT.OPTION_A}</OptionName>
            <OptionInput
              id={ID.OPTION_A}
              value={inputValues.optionA}
              onChange={handleChangeOptionValues}
              onBlur={handleBlurTrim}
              placeholder={PLACEHOLDER.OPTION_B}
            />
            {isMaxLineInput.optionA && (
              <OptionInputWarning>
                <Icon
                  name={'warn'}
                  color={COLOR.WARN}
                />
                {TEXT.WARN_MAX_LINE}
              </OptionInputWarning>
            )}
            <OptionLengthLimit>
              {inputValues.optionA.length} / {MAX_INPUT_LENGTH}
            </OptionLengthLimit>
          </OptionContent>

          <VsContainer>{TEXT.VERSUS}</VsContainer>

          <OptionContent>
            <OptionName>{TEXT.OPTION_B}</OptionName>
            <OptionInput
              id={ID.OPTION_B}
              value={inputValues.optionB}
              onChange={handleChangeOptionValues}
              onBlur={handleBlurTrim}
              placeholder={PLACEHOLDER.OPTION_B}
            />
            {isMaxLineInput.optionB && (
              <OptionInputWarning>
                <Icon
                  name={'warn'}
                  color={COLOR.WARN}
                />
                {TEXT.WARN_MAX_LINE}
              </OptionInputWarning>
            )}
            <OptionLengthLimit>
              {inputValues.optionB.length} / {MAX_INPUT_LENGTH}
            </OptionLengthLimit>
          </OptionContent>
        </OptionContainer>

        <SubmitButton
          disabled={!isCreatePostPossible}
          onClick={handleClickCreatePost}>
          {TEXT.SUBMIT}
        </SubmitButton>
      </PageContainer>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(() => false);
          }}>
          {TEXT.CREATE_POST_FAIL}
        </Modal>
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

  &:focus-within {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const TitleInput = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  width: 70%;
  vertical-align: center;
  color: ${ANGOLA_STYLES.color.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: ${ANGOLA_STYLES.color.dark};
    text-overflow: ellipsis;
  }

  @media (max-width: 900px) {
    width: 90%;
  }
`;

const TitleLengthLimit = styled.span`
  box-sizing: border-box;
  position: absolute;
  right: 28px;
  bottom: 22px;
  color: ${ANGOLA_STYLES.color.text};
  line-height: 100%;

  @media (max-width: 900px) {
    display: none;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  padding: 12px 0px;
  align-items: center;
  justify-content: center;
  gap: 52px;
  align-self: stretch;

  @media (max-width: 1160px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const OptionContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const OptionName = styled.p`
  box-sizing: border-box;
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
  line-height: 100%;
`;

const OptionInput = styled.textarea`
  box-sizing: border-box;
  width: 400px;
  display: flex;
  min-height: 256px;
  resize: none;
  padding: 20px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-shrink: 0;
  text-align: center;
  outline: none;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  line-height: 42px;
  border-radius: 24px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.gray};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  word-break: break-all;
  overflow: hidden;

  &::placeholder {
    color: ${ANGOLA_STYLES.color.dark};
  }

  &:focus {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const OptionInputWarning = styled.span`
  display: inline-flex;
  line-height: 22px;
  gap: 8px;
  align-items: center;
  position: absolute;
  bottom: -20px;
  color: ${COLOR.WARN};
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
  text-align: center;
  color: ${ANGOLA_STYLES.color.black};
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
