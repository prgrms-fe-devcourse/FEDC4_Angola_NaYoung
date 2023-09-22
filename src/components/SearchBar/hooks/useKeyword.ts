import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_KEYS } from '@constants/index';

const useKeyword = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addKeywordToQueryString = ({ keyword }: { keyword: string }) => {
    searchParams.set(SEARCH_KEYS.KEYWORD, keyword);
    setSearchParams(searchParams);
  };

  const removeKeywordFromQueryString = () => {
    searchParams.delete(SEARCH_KEYS.KEYWORD);
    setSearchParams(searchParams);
  };

  const [keyword, setKeyword] = useState<string>('');

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleResetKeyword = () => {
    setKeyword('');
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

  return {
    addKeywordToQueryString,
    removeKeywordFromQueryString,
    keyword,
    handleChangeKeyword,
    handleResetKeyword,
    handleSubmitKeyword,
  };
};

export default useKeyword;
