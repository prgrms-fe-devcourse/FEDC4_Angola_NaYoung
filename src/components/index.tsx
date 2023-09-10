import { HashLoader } from 'react-spinners';

interface SpinnerProps {
  color: string;
  size: number;
}

const Spinner = ({ color = '#86B7FF', size = 100 }: SpinnerProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      <HashLoader
        color={color}
        size={size}
        speedMultiplier={1.3}
      />
    </div>
  );
};

export default Spinner;
