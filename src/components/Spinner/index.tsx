import { CSSProperties } from 'react';
import { HashLoader } from 'react-spinners';

const DEFAULT_POSITION_STYLE: Record<string, string> = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
interface SpinnerProps {
  color?: string;
  size?: number;
  spinnerPositionStyle?: CSSProperties;
}

const Spinner = ({
  color = '#86B7FF',
  size = 100,
  spinnerPositionStyle = DEFAULT_POSITION_STYLE,
}: SpinnerProps) => {
  return (
    <div style={{ ...spinnerPositionStyle }}>
      <HashLoader
        color={color}
        size={size}
        speedMultiplier={1.3}
      />
    </div>
  );
};

export default Spinner;
