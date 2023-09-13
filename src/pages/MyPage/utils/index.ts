const NUMBER = /[0-9]/;
const CHARACTER = /[a-zA-Z]/;
const SPECIAL_CHARACTER = /[~!@#$%^&*()_+|<>?:{}]/;
const MIN_LENGTH = 5;
const MAX_LENGTH = 15;

export const checkFullNamePattern = (fullName: string) => {
  const trimmedFullName = fullName.trim();

  if (
    SPECIAL_CHARACTER.test(trimmedFullName) ||
    trimmedFullName.length > MAX_LENGTH ||
    trimmedFullName.length < MIN_LENGTH
  ) {
    alert(
      '아이디는 5자리 이상 15자리 이하 문자 또는 숫자로 구성하여야 합니다.',
    );
    return false;
  } else {
    alert('닉네임 변경 성공!');
    return true;
  }
};

export const checkPassWordPattern = (passWord: string) => {
  const trimmedPassWord = passWord.trim();
  if (
    !NUMBER.test(trimmedPassWord) ||
    !CHARACTER.test(trimmedPassWord) ||
    !SPECIAL_CHARACTER.test(trimmedPassWord) ||
    trimmedPassWord.length < MIN_LENGTH ||
    trimmedPassWord.length > MAX_LENGTH
  ) {
    alert(
      '비밀번호는 5자리 이상 15자 이하 문자, 숫자, 특수문자로 구성하여야 합니다.',
    );
    return false;
  } else {
    alert('비밀번호 변경 성공!');
    return true;
  }
};
