import { useEffect, useState } from 'react';
import { useFetchUpdateFullName } from '@apis/profile';
import { checkFullNamePattern } from '@utils/userAuthentication';

interface useUpdateFullNameProps {
  name: string;
}

const useUpdateFullName = ({ name }: useUpdateFullNameProps) => {
  const { updateFullNameMutate } = useFetchUpdateFullName();
  const [newFullName, setNewFullName] = useState(name);
  const [isEditingFullName, setIsEditingFullName] = useState(false);

  useEffect(() => {
    setNewFullName(name);
  }, [name]);

  const handleClickUpdateFullName = () => {
    if (isEditingFullName) {
      if (checkFullNamePattern(newFullName)) {
        updateFullNameMutate({ fullName: newFullName });
      } else {
        setNewFullName('');
        return;
      }
    } else {
      setNewFullName('');
    }
    setIsEditingFullName(!isEditingFullName);
  };

  const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFullName(e.target.value);
  };

  return {
    newFullName,
    isEditingFullName,
    handleChangeFullName,
    handleClickUpdateFullName,
  };
};

export default useUpdateFullName;
