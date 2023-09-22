import { useState } from 'react';

interface useModalProps {
  id: string;
  deletePostMutate?: ({ id }: { id: string }) => void;
}

const useDeletePost = ({ id, deletePostMutate }: useModalProps) => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleDeletedPost = () => {
    if (deletePostMutate) {
      deletePostMutate({ id });
    }
    setToggleModal(false);
  };

  return { toggleModal, setToggleModal, handleDeletedPost };
};

export default useDeletePost;
