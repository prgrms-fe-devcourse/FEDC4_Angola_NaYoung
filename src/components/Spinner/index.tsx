import type { CSSProperties } from 'react';
import { FadeLoader } from 'react-spinners';
import { ANGOLA_STYLES } from '@styles/commonStyles';

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
  color = ANGOLA_STYLES.color.dark,
  spinnerPositionStyle = DEFAULT_POSITION_STYLE,
}: SpinnerProps) => {
  return (
    <div style={{ ...spinnerPositionStyle }}>
      <FadeLoader
        color={color}
        speedMultiplier={1.3}
      />
    </div>
  );
};

export default Spinner;
