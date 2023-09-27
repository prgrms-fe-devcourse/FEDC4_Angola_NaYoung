import type { Dispatch, SetStateAction } from 'react';

interface useSelectItemProps {
  votedValue: string;
  setVotedValue: Dispatch<SetStateAction<string>>;
  setSubmitValue: Dispatch<SetStateAction<string | undefined>>;
}

const useSelectItem = ({
  votedValue,
  setVotedValue,
  setSubmitValue,
}: useSelectItemProps) => {
  const handleClickItem = (value: string) => {
    votedValue === value ? setVotedValue('') : setVotedValue(value);
    setSubmitValue('');
  };
  return { handleClickItem };
};

export default useSelectItem;
