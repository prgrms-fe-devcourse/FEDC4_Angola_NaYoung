export const SIGNUP_INITIAL_VALUE = {
  EMAIL: 'init',
  PASSWORD: 'init',
  FULLNAME: 'in',
};

export const MSG = {
  WARNING: {
    EMPTY: {
      EMAIL: '이메일을 입력해주세요.',
      PASSWORD: '비밀번호를 입력해주세요.',
      FULLNAME: '닉네임을 입력해주세요.',
    },
  },
  ERROR: {
    DUPLICATE_CHECK: '중복검사를 위해 유저 정보를 가져오는데 실패하였습니다.',
  },
};

export const BUTTON = {
  DUPLICATE_CHECK: '중복 검사',
  SIGN_UP: '가입 완료하기',
};

export const COLOR = {
  ICON: {
    WARN: '#F66',
    DOUBLE_CHECK: '#78D968',
  },
  MSG: {
    INVALID: '#F66',
    VALID: '#78D968',
  },
};

export const INPUT = {
  LABEL: {
    EMAIL: '1. 이메일을 입력하세요.',
    PASSWORD: '2. 비밀번호를 입력하세요.',
    FULLNAME: '3. 닉네임을 입력하세요.',
  },
  TYPE: {
    TEXT: 'text',
    PASSWORD: 'password',
  },
  PLACEHOLDER: {
    EMAIL: 'angola@gmail.com',
    PASSWORD: '5자리 이상 15자 이하 문자, 숫자, 특수문자로 입력해주세요.',
    PASSWORD_CONFIRM: '동일한 비밀번호를 다시 입력해주세요.',
    FUllNAME: '3자 이상 8자 이하의 닉네임을 지어주세요.',
  },
  AUTO_COMPLETE: 'on',
};

export const MODAL = {
  MSG: {
    SIGN_UP: {
      SUCCESS: '회원가입이 완료되었습니다!',
      FAIL: '회원가입에 실패하였습니다!',
    },
    WARN: {
      EMAIL: '이메일 중복 검사를 해주세요!',
      PASSWORD: '비밀번호를 다시 확인해주세요!',
      FULLNAME: '닉네임 중복 검사를 해주세요!',
    },
  },
  SUB_MSG: 'Enter/Esc 또는 주변을 클릭하세요.',
};
