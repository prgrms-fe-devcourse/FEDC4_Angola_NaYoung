import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseSortProps {
  SORT_VALUE?: string;
}

interface UseSortReturnProps {
  selectValue: string | undefined;
  handleChangeSelect: (sort: string) => void;
}

const useSort = ({ SORT_VALUE }: UseSortProps): UseSortReturnProps => {
  const [selectValue, setSelectValue] = useState(SORT_VALUE);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeSelect = (value: string) => {
    searchParams.set('sort', value);
    setSelectValue(value);
    setSearchParams(searchParams);
  };

  return { selectValue, handleChangeSelect };
};

export default useSort;
