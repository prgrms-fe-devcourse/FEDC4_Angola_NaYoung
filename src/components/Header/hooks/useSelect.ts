import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseSortProps {
  SORT_VALUE?: string;
}

interface UseSortReturnProps {
  handleChangeSelect: (sort: string) => void;
}

const useSelect = ({ SORT_VALUE }: UseSortProps): UseSortReturnProps => {
  const [, setSelectValue] = useState(SORT_VALUE);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeSelect = (value: string) => {
    searchParams.set('sort', value);
    setSelectValue(value);
    setSearchParams(searchParams);
  };

  return { handleChangeSelect };
};

export default useSelect;
