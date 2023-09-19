import { ChangeEvent, useEffect, useState } from 'react';
import { useFetchUpdateProfileImage } from '@apis/profile';

interface useUpdateProfileProps {
  image: string;
}

const useUpdateProfile = ({ image }: useUpdateProfileProps) => {
  const [profileImageUrl, setProfileImageUrl] = useState(image);
  const {
    updateProfileImageMutate,
    updateProfileImageData,
    isUpdateProfileImageSuccess,
    isUpdateProfileImageLoading,
  } = useFetchUpdateProfileImage();

  useEffect(() => {
    setProfileImageUrl(image);
  }, [image]);

  const handleChangeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setProfileImageUrl(imageUrl);
      updateProfileImageMutate({ image: imageFile, isCover: false });
    }
  };

  useEffect(() => {
    if (isUpdateProfileImageSuccess && updateProfileImageData.image) {
      setProfileImageUrl(updateProfileImageData.image); // 이미지 URL 업데이트
    }
  }, [updateProfileImageData, isUpdateProfileImageSuccess]);

  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  return {
    profileImageUrl,
    isUpdateProfileImageLoading,
    handleChangeProfileImage,
  };
};

export default useUpdateProfile;
