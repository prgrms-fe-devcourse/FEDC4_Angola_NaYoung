import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const addKeywordToQueryString = ({ keyword }: { keyword: string }) => {
    searchParams.set('keyword', keyword);
    setSearchParams(searchParams);
  };

  const removeKeywordFromQueryString = () => {
    searchParams.delete('keyword');
    setSearchParams(searchParams);
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword.length) {
      addKeywordToQueryString({ keyword: keyword.trim() });
      setKeyword('');
    } else {
      removeKeywordFromQueryString();
    }
  };

  const handleResetKeyword = () => {
    setKeyword('');
  };

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
        placeholder="유저 또는 포스트를 검색하세요"
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
  align-items: center;
  border-radius: 44px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};

  &:focus-within {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }

  @media (max-width: 660px) {
    display: none;
  }
`;

const SubmitButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: ${ANGOLA_STYLES.color.white};
  border: none;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  margin: 0 0 0 12px;
  padding: 0;
  height: 30px;
  width: calc((100vw - 514px) * 0.65);

  @media (max-width: 780px) {
    width: calc((100vw - 514px) * 0.4);
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
`;
