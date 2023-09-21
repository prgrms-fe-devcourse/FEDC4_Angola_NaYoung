import { CSSProperties, useEffect } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import styled from '@emotion/styled';
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

  const { fire, getInstance } = useConfetti();
  useEffect(() => {
    fire();
  }, []);

  return (
    <>
      <Container>
        <div>레벨 상승 Lv.{level}</div>
        <button onClick={handleClose}>X</button>
      </Container>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={canvasStyles}
      />
    </>
  );
};

export default LevelModal;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 400px;
  height: 200px;
  font-size: 60px;
  background-color: white;
  color: black;
  z-index: 100;
`;
