import type { User } from '@type';

const PASSWORD_REGEXP = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{5,15}$/;
const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const SPECIAL_CHARACTER_REGEXP = /[~!@#$%^&*()_+|<>?:{}]/;
const FULL_NAME_MIN_LENGTH = 3;
const FULL_NAME_MAX_LENGTH = 8;

interface checkEmailPatternProps {
  email: string;
}

interface checkDuplicatedEmailProps {
  email: string;
  usersData?: User[];
}

interface checkFullNamePatternProps {
  fullName: string;
}

interface checkDuplicatedFullNameProps {
  fullName: string;
  usersData?: User[];
  myFullName?: string;
}

interface checkPassWordPatternProps {
  newPassWord: string;
  confirmNewPassWord?: string;
}

export const checkEmailPattern = ({ email }: checkEmailPatternProps) => {
  const trimmedEmail = email.trim();
  let isValidEmail;
  let msg;

  if (!EMAIL_REGEXP.test(trimmedEmail)) {
    msg = '유효한 이메일 주소가 아닙니다.';
    isValidEmail = false;
  } else {
    msg = '유효한 이메일 주소입니다.';
    isValidEmail = true;
  }
  return { msg, isValidEmail };
};

export const checkDuplicatedEmail = ({
  email,
  usersData,
}: checkDuplicatedEmailProps) => {
  let isValidEmail;
  let msg;

  if (usersData?.find((user) => user.email === email)) {
    msg = '이미 가입된 이메일입니다.';
    isValidEmail = false;
  } else {
    msg = '사용할 수 있는 이메일입니다.';
    isValidEmail = true;
  }
  return { msg, isValidEmail };
};

export const checkFullNamePattern = ({
  fullName,
}: checkFullNamePatternProps) => {
  const trimmedFullName = fullName.trim();

  let isValidFullName;
  let msg;

  if (
    SPECIAL_CHARACTER_REGEXP.test(trimmedFullName) ||
    trimmedFullName.length < FULL_NAME_MIN_LENGTH ||
    trimmedFullName.length > FULL_NAME_MAX_LENGTH
  ) {
    msg = '닉네임은 3자리 이상 8자리 이하 문자 또는 숫자로 구성하여야 합니다.';
    isValidFullName = false;
  } else {
    msg = '유효한 닉네임 형식입니다.';
    isValidFullName = true;
  }
  return { msg, isValidFullName };
};

export const checkDuplicatedFullName = ({
  fullName,
  usersData,
  myFullName,
}: checkDuplicatedFullNameProps) => {
  let isValidFullName;
  let msg;

  if (
    myFullName !== fullName &&
    usersData?.find((user) => user.fullName === fullName)
  ) {
    msg = '이미 가입된 닉네임입니다.';
    isValidFullName = false;
  } else {
    msg = '사용할 수 있는 닉네임입니다.';
    isValidFullName = true;
  }
  return { msg, isValidFullName };
};

export const checkPassWordPattern = ({
  newPassWord,
  confirmNewPassWord,
}: checkPassWordPatternProps) => {
  const trimmedPassWord = newPassWord.trim();

  let isValidPassword = false;
  let isValidPasswordConfirm = false;
  let passwordMsg = '';
  let passwordConfirmMsg = '';

  if (!PASSWORD_REGEXP.test(trimmedPassWord)) {
    passwordMsg =
      '비밀번호는 5자리 이상 15자 이하 문자, 숫자, 특수문자를 모두 포함해야 합니다.';
    isValidPassword = false;
  } else {
    isValidPassword = true;
  }

  if (newPassWord !== confirmNewPassWord) {
    passwordConfirmMsg = '비밀번호가 일치하지 않습니다.';
    isValidPasswordConfirm = false;
  } else if (newPassWord === '' && confirmNewPassWord === '') {
    passwordConfirmMsg = '비밀번호를 입력해주세요';
    isValidPasswordConfirm = false;
  } else {
    passwordConfirmMsg = '비밀번호가 일치합니다.';
    isValidPasswordConfirm = true;
  }
  return {
    passwordMsg,
    passwordConfirmMsg,
    isValidPassword,
    isValidPasswordConfirm,
  };
};
