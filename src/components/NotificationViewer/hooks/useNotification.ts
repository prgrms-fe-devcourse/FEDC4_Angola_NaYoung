import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '@type';
import {
  useFetchGetNotifications,
  useFetchReadNotifications,
} from '@apis/notifications';
import { ID } from '../constants';

interface useNotificationPropsType {
  handleClickCloseViewer: VoidFunction;
}
const useNotification = ({
  handleClickCloseViewer,
}: useNotificationPropsType) => {
  const navigate = useNavigate();
  const viewerBackGroundRef = useRef(null);

  useEffect(() => {
    const handleClickViewerBackGround = (e: Event) => {
      if (
        viewerBackGroundRef.current &&
        e.target === viewerBackGroundRef.current
      ) {
        handleClickCloseViewer();
      }
    };

    window.addEventListener('click', handleClickViewerBackGround);

    return () => {
      window.removeEventListener('click', handleClickViewerBackGround);
    };
  });

  const handleClickListItem = (
    e: MouseEvent<HTMLLIElement>,
    notification: Notification,
  ) => {
    if (e.target instanceof HTMLSpanElement && e.target.id === ID.USER_NAME_SPAN_ELEMENT) {
      navigate(`/user/${notification.author._id}`);
    } else {
      if (notification.post === null) {
        navigate(`/user/${notification.author._id}`);
      } else {
        navigate(`/post/${notification.post}`);
      }
    }
    handleClickCloseViewer();
  };

  const [isShowAllNotifications, setIsShowAllNotifications] = useState(false);

  const {
    getNotificationsData,
    isGetNotificationsLoading,
    getNotificationRefetch,
  } = useFetchGetNotifications();

  const { readNotificationsMutate, isReadNotificationsLoading } =
    useFetchReadNotifications();

  const handleClickReadNotifications = () => {
    readNotificationsMutate(undefined, {
      onSuccess: () => {
        getNotificationRefetch();
      },
    });
  };

  return {
    viewerBackGroundRef,
    isShowAllNotifications,
    setIsShowAllNotifications,
    getNotificationsData,
    isGetNotificationsLoading,
    isReadNotificationsLoading,
    handleClickReadNotifications,
    handleClickListItem,
  };
};

export default useNotification;
