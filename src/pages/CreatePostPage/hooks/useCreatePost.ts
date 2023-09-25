import type { ChangeEvent, FocusEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchCreatePost } from '@apis/post';
import { joinDataBySeparator } from '@utils/parseDataBySeparator';
import { MAX_INPUT_LENGTH } from '../constants';

const useCreatePost = () => {
  const navigate = useNavigate();
  const {
    createPostMutate,
    createPostData,
    isCreatePostLoading,
    isCreatePostSuccess,
    isCreatePostError,
  } = useFetchCreatePost();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputValues, setInputValues] = useState({
    title: '',
    optionA: '',
    optionB: '',
  });

  const isCreatePostPossible: boolean =
    inputValues.title.length > 0 &&
    inputValues.optionA.length > 0 &&
    inputValues.optionB.length > 0;

  const [isMaxLineInput, setIsMaxLineInput] = useState({
    optionA: false,
    optionB: false,
  });

  const handleChangeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValues({
      ...inputValues,
      title: value.substring(0, MAX_INPUT_LENGTH),
    });
  };

  const handleChangeOptionValues = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (e.target.scrollHeight === e.target.clientHeight) {
      setInputValues({
        ...inputValues,
        [id]: value.substring(0, MAX_INPUT_LENGTH),
      });
      setIsMaxLineInput({
        ...isMaxLineInput,
        [id]: false,
      });
    } else {
      setIsMaxLineInput({
        ...isMaxLineInput,
        [id]: true,
      });
    }
  };

  const handleBlurTrim = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setInputValues({
      ...inputValues,
      [id]: value.trim(),
    });
  };

  const handleClickCreatePost = () => {
    if (!isCreatePostPossible) return;

    const postTitle = joinDataBySeparator(
      inputValues.title,
      inputValues.optionA,
      inputValues.optionB,
    );

    createPostMutate({ title: postTitle });
  };

  useEffect(() => {
    if (isCreatePostSuccess) {
      navigate(`/post/${createPostData}`);
    }
  }, [createPostData, isCreatePostSuccess, navigate]);

  useEffect(() => {
    if (isCreatePostError) {
      setIsModalOpen(() => true);
    }
  }, [isCreatePostError]);

  return {
    inputValues,
    isModalOpen,
    setIsModalOpen,
    isMaxLineInput,
    isCreatePostLoading,
    isCreatePostPossible,
    handleChangeTitleValue,
    handleChangeOptionValues,
    handleClickCreatePost,
    handleBlurTrim,
  };
};

export default useCreatePost;
