import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseSortProps {
  sort?: string;
}

interface UseSortReturnProps {
  selectValue: string | undefined;
  handleChangeSelect: (sort: string) => void;
}

const useSort = ({ sort }: UseSortProps): UseSortReturnProps => {
  const [selectValue, setSelectValue] = useState(sort);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeSelect = (value: string) => {
    searchParams.set('sort', value);
    setSelectValue(value);
    setSearchParams(searchParams);
  };

  return { selectValue, handleChangeSelect };
};

export default useSort;
