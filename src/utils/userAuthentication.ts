import { User } from '@type';

const NUMBER = /[0-9]/;
const CHARACTER = /[a-zA-Z]/;
const SPECIAL_CHARACTER = /[~!@#$%^&*()_+|<>?:{}]/;
const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const FULLNAME_MIN_LENGTH = 3;
const FULLNAME_MAX_LENGTH = 8;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 15;

interface checkEmailPatternProps {
  email: string;
  usersData?: User[];
}

interface checkFullNamePatternProps {
  fullName: string;
  usersData?: User[];
  myFullName?: string;
}

interface checkPassWordPatternProps {
  newPassWord: string;
  confirmNewPassWord?: string;
}

export const checkEmailPattern = ({
  email,
  usersData,
}: checkEmailPatternProps) => {
  const trimmedEmail = email.trim();
  let isValidEmail;
  let msg;

  if (!EMAIL_REGEXP.test(trimmedEmail)) {
    msg = '유효한 이메일 주소가 아닙니다.';
    isValidEmail = false;
  } else if (usersData?.find((user) => user.email === email)) {
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
  usersData,
  myFullName,
}: checkFullNamePatternProps) => {
  const trimmedFullName = fullName.trim();

  let isValidFullName;
  let msg;

  if (
    SPECIAL_CHARACTER.test(trimmedFullName) ||
    trimmedFullName.length > FULLNAME_MAX_LENGTH ||
    trimmedFullName.length < FULLNAME_MIN_LENGTH
  ) {
    msg = '닉네임은 3자리 이상 8자리 이하 문자 또는 숫자로 구성하여야 합니다.';
    isValidFullName = false;
  } else if (
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

  if (
    !NUMBER.test(trimmedPassWord) ||
    !CHARACTER.test(trimmedPassWord) ||
    !SPECIAL_CHARACTER.test(trimmedPassWord) ||
    trimmedPassWord.length <= PASSWORD_MIN_LENGTH ||
    trimmedPassWord.length >= PASSWORD_MAX_LENGTH
  ) {
    passwordMsg =
      '비밀번호는 5자리 이상 15자 이하 문자, 숫자, 특수문자로 구성하여야 합니다.';
    isValidPassword = false;
  } else {
    isValidPassword = true;
  }

  if (newPassWord !== confirmNewPassWord) {
    passwordConfirmMsg = '비밀번호가 일치하지 않습니다.';
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
