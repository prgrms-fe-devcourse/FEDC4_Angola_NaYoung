import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface useSortProps {
  sort?: string;
}

interface useSortReturnProps {
  selectValue: string | undefined;
  handleChangeSelect: (sort: string) => void;
}

const useSort = ({ sort }: useSortProps): useSortReturnProps => {
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
