import { Icon } from '@components';
import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface ToTopButtonProp {
  onScrollToTop: VoidFunction;
}

const ToTopButton = ({ onScrollToTop: handleScrollToTop }: ToTopButtonProp) => {
  return (
    <Button onClick={handleScrollToTop}>
      <Icon
        color={ANGOLA_STYLES.color.white}
        name="arrow_up"
      />
    </Button>
  );
};

export default ToTopButton;

const Button = styled.button`
  position: absolute;
  bottom: 16px;
  right: 32px;
  border: ${ANGOLA_STYLES.border.default};
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding-top: 2px;
  cursor: pointer;
  background-color: ${rgba(ANGOLA_STYLES.color.text, 0.6)};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonXs.default};
  transition: 0.2s;
  &:hover {
    background-color: ${ANGOLA_STYLES.color.text};
    box-shadow: ${ANGOLA_STYLES.shadow.buttonXs.hover};
    padding-top: 4px;
    &::after {
      content: '맨 위로';
      position: absolute;
      top: -28px;
      font-size: 11px;
      width: 48px;
      padding: 4px;
      border-radius: 24px;
      border: 2px solid ${ANGOLA_STYLES.color.gray};
      background-color: ${rgba(ANGOLA_STYLES.color.white, 0.8)};
    }
  }
`;
