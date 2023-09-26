import { Icon } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { PLACEHOLDER } from './constants';
import { useKeyword } from './hooks';

const SearchBar = () => {
  const {
    keyword,
    handleChangeKeyword,
    handleResetKeyword,
    handleSubmitKeyword,
  } = useKeyword();

  return (
    <StyledForm
      onSubmit={handleSubmitKeyword}
      onReset={handleResetKeyword}>
      <SubmitButton type="submit">
        <Icon
          name="search"
          size={'30'}
        />
      </SubmitButton>
      <StyledInput
        type="text"
        value={keyword}
        placeholder={PLACEHOLDER.SEARCH_INPUT}
        onChange={handleChangeKeyword}></StyledInput>

      <ClearTextButton type="reset">
        <Icon
          name="close"
          size={'30'}
        />
      </ClearTextButton>
    </StyledForm>
  );
};

export default SearchBar;

const StyledForm = styled.form`
  box-sizing: border-box;
  position: relative;
  height: 60px;
  display: flex;
  padding: 0px 20px;
  margin-top: 2px;
  align-items: center;
  border-radius: 44px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  transition: box-shadow 0.2s;
  width: 100%;
  flex-grow: 1;
  &:focus-within {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const SubmitButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: ${ANGOLA_STYLES.color.white};
  border: none;
  cursor: pointer;

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  margin: 0 0 0 12px;
  padding: 0;
  height: 30px;
  width: calc((100vw - 500px) * 0.65);
  &::placeholder {
    font-size: ${ANGOLA_STYLES.textSize.titleSm};
  }
  @media (max-width: 800px) {
    width: calc(100vw - 300px);
  }
  @media (max-width: 600px) {
    margin-left: 6px;
    &::placeholder {
      font-size: ${ANGOLA_STYLES.textSize.text};
    }
  }
  @media (max-width: 400px) {
    width: calc(100vw - 214px);
    margin: 0;
  }
`;

const ClearTextButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  right: 12px;
  margin: 0;
  padding: 0;
  background: ${ANGOLA_STYLES.color.white};
  border: none;
  cursor: pointer;

  @media (max-width: 680px) {
    display: none;
  }
`;
