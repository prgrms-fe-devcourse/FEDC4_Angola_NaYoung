import styled from '@emotion/styled';

interface LevelModalProps {
  level: number;
  onClose: VoidFunction;
}

const LevelModal = ({ level, onClose: handleClose }: LevelModalProps) => {
  return (
    <Container>
      <div>레벨 상승 Lv.{level}</div>
      <button onClick={handleClose}>X</button>
    </Container>
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
