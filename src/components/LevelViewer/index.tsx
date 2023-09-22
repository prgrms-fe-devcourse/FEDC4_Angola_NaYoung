import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { userArchives, userLevel } from '@store/level';
import LevelModal from './components/LevelModal';
import { checkIsNumber } from './utils/checkIsNumber';

const LevelViewer = () => {
  const archives = useRecoilValue(userArchives);
  const level = useRecoilValue(userLevel);
  const prevLevel = useRef(level);
  const [isUpperLevel, setIsUpperLevel] = useState(false);

  useEffect(() => {
    if (level === prevLevel.current) return;
    if (checkIsNumber(prevLevel.current) && checkIsNumber(level)) {
      setIsUpperLevel(prevLevel.current < level);
    }
    prevLevel.current = level;
  }, [archives, level]);

  useEffect(() => {
    isUpperLevel && console.log('레벨상승', level, '도달!');
  }, [isUpperLevel]);

  const appNode = document.getElementById('app');

  return (
    <>
      {isUpperLevel &&
        level &&
        appNode &&
        createPortal(
          <LevelModal
            level={level}
            onClose={() => setIsUpperLevel(false)}
          />,
          appNode,
        )}
    </>
  );
};

export default LevelViewer;
