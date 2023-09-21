import styled from '@emotion/styled';
import Icon from '@components/Icon';
import { COLOR } from '../constants';

interface InputEmailMsgProps {
  invalidEmailMsg: string;
  validEmailMsg: string;
}

const InputEmailMsg = ({
  invalidEmailMsg,
  validEmailMsg,
}: InputEmailMsgProps) => {
  return (
    <>
      {invalidEmailMsg && (
        <InputWarning>
          <Icon
            name={'warn'}
            color={COLOR.ICON.WARN}
          />
          {invalidEmailMsg}
        </InputWarning>
      )}
      {validEmailMsg && (
        <InputWarning style={{ color: COLOR.MSG.VALID }}>
          {validEmailMsg}
        </InputWarning>
      )}
    </>
  );
};

export default InputEmailMsg;

const InputWarning = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: ${COLOR.MSG.INVALID};
  padding-left: 1rem;
  gap: 8px;
`;
