import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_KEYS } from '@constants/index';

interface UseSortProps {
  SORT_VALUE?: string;
}

interface UseSortReturnProps {
  handleChangeSelect: (value: string) => void;
}

const useSelect = ({ SORT_VALUE }: UseSortProps): UseSortReturnProps => {
  const [, setSelectValue] = useState(SORT_VALUE);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeSelect = (value: string) => {
    searchParams.set(SEARCH_KEYS.SORT, value);
    setSelectValue(value);
    setSearchParams(searchParams);
  };

  return { handleChangeSelect };
};

export default useSelect;
