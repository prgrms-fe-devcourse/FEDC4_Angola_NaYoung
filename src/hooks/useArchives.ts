import { useRecoilState } from 'recoil';
import { userArchives } from '@store/level';

export const useArchives = () => {
  const [archives, setArchives] = useRecoilState(userArchives);

  const addCommentArchive = () => {
    if (!archives) return;
    setArchives({ ...archives, commentsLength: archives.commentsLength + 1 });
  };

  const removeCommentArchive = () => {
    if (!archives) return;
    setArchives({ ...archives, commentsLength: archives.commentsLength - 1 });
  };

  const addPostArchive = () => {
    if (!archives) return;
    setArchives({ ...archives, postsLength: archives.postsLength + 1 });
  };

  const removePostArchive = () => {
    if (!archives) return;
    setArchives({ ...archives, postsLength: archives.postsLength - 1 });
  };

  return {
    addCommentArchive,
    removeCommentArchive,
    addPostArchive,
    removePostArchive,
  };
};
