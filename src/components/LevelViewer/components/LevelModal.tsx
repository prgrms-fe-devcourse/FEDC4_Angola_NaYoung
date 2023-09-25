import type { CSSProperties } from 'react';
import { useEffect } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { Icon } from '@components';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@store/auth';
import { getUserLevelInfo } from '@utils/calculateUserLevel';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { useConfetti } from '../hooks/useConfetti';

interface LevelModalProps {
  level: number;
  onClose: VoidFunction;
}

const LevelModal = ({ level, onClose: handleClose }: LevelModalProps) => {
  const canvasStyles: CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  };

  const { makeConfetti, getConfetti } = useConfetti();
  const { userColor, userEmoji } = getUserLevelInfo(level);
  const { userEmoji: prevEmoji } = getUserLevelInfo(level - 1);
  const auth = useRecoilValue(authInfoState);

  useEffect(() => {
    makeConfetti();
  }, []);

  return (
    <Wrapper>
      <Container>
        <LevelIcon>
          {prevEmoji}
          <Icon name="arrow_right" />
          {userEmoji}
        </LevelIcon>
        <div>
          축하합니다 <Name>{auth?.userFullName}</Name>님!
        </div>
        <div>
          <Level
            className={level === 7 ? 'full' : 'not_full'}
            color={userColor}>
            레벨 {level}
          </Level>
          에 도달했습니다
        </div>
        <Button
          level={level}
          onClick={handleClose}>
          더 올리러 가기
        </Button>
      </Container>
      <ReactCanvasConfetti
        refConfetti={getConfetti}
        style={canvasStyles}
      />
    </Wrapper>
  );
};

export default LevelModal;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 15;
  backdrop-filter: blur(2.5px);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${ANGOLA_STYLES.color.white};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 0px 0px ${ANGOLA_STYLES.color.gray};
`;

const LevelIcon = styled.div`
  margin-bottom: 20px;
`;

const Name = styled.h1`
  display: inline;
`;

const Level = styled.h1<{ color: string }>`
  display: inline;
  &.full {
    background: ${({ color }) => color};
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
  &.not_full {
    color: ${({ color }) => color};
  }
`;

const Button = styled.button<{ level: number }>`
  background: ${({ level }) => ANGOLA_STYLES.color.levels[level].fill};
  color: ${({ level }) => ANGOLA_STYLES.color.levels[level].text};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  padding: 8px 12px;
  margin-top: 20px;
  border-radius: 24px;
  border: none;
  box-shadow: 0px 4px 0px 0px ${ANGOLA_STYLES.color.gray};
  cursor: pointer;
  translate: 0.2s;
  &:hover:not(:active) {
    transform: scale(1.02);
  }
`;
