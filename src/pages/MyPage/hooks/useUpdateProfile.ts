import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
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
    isUpdateProfileImageError,
  } = useFetchUpdateProfileImage();
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);

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
      setProfileImageUrl(updateProfileImageData.image);
    }
  }, [updateProfileImageData, isUpdateProfileImageSuccess]);

  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  useEffect(() => {
    if (isUpdateProfileImageError) {
      setIsProfileImageModalOpen(true);
      setProfileImageUrl(image);
    }
  }, [isUpdateProfileImageError, setProfileImageUrl, image]);

  return {
    profileImageUrl,
    isUpdateProfileImageLoading,
    handleChangeProfileImage,
    setIsProfileImageModalOpen,
    isProfileImageModalOpen,
  };
};

export default useUpdateProfile;
