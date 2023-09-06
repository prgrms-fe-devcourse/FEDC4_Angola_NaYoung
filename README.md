## 앙~골라
### 1. Branch 전략

---

1. **브랜치 관리**

```markdown
main > dev > feature (기능 단위)
```

1. **브랜치 명명**

```markdown
**feat/#이슈번호/기능명**

****ex) feat/#12/make-post
```

1. **주의사항**
- **브랜치는 삭제하지 않는다.**
- 기능명 작성 시, 단어가 여러 개면 `-` 로 구분한다.

### 2. Commit 규칙

---

- 모든 커밋은 **[추가, 삭제 이동, 수정]**으로 끝낼 것
- **커밋을 자주** 하자
- 커밋 메세지 형식 : `feat: #12 - post 삭제 기능 추가`

| init:  | 프로젝트 첫 세팅 |
| --- | --- |
| feat:  | 기능 구현
사용자 입장에서 변화가 있을 경우 |
| refactor:  | 사용자 입장에서 변화가 없는 코드
파일명 폴더명 변경 및 이동 |
| chore:      | 주석
추가적인 의존성 설치
리드미 수정
기타 |
| style:   | CSS만 수정 |
| fix:  | 버그 수정 |
- 커밋 메세지 Issue와 연결하기
    
    [[개발] Github 이슈와 커밋 메시지를 연결해보자](https://devport.tistory.com/12)
    

### 3. 디렉토리 구조

---

- 각 폴더에 `index.ts` 넣기 (`export` 되는 것만)

```markdown
├── public
|   └── assets
├── src
│   ├── components
|   |   └── Post // default 컴포넌트에서 분리가 발생하면 여기에 넣기
|   |        └── **index.tsx // default 컴포넌트**
│   ├── types // 명세 + 한 번 이상 쓰이는 타입 파
|   ├── pages
|   ├── constants // 스타일 상수, 그냥 상수는 파일로 분리! 
|   ├── hooks
|   ├── apis
|   ├── App.tsx
|   ├── index.tsx
|   └── index.css // 전역 스타일
└──
```

### 4. Code 규칙

---

```tsx
import React from 'react'

const CONSTANT = 70 // 상수명 - import 문 바로 밑에
const API_ENDPOINT = "Angola"

interface 컴포넌트props { } // props 타입 별칭 (컴포넌트명+props) 

const 컴포넌트 = ({}: 컴포넌트props) => {
	// ...
	
	return ();
}

export default 컴포넌트;

const Container = styled.div` // styled 부분 컴포넌트 아래에 쓰기
 // ...
`
```

- 파일명 - 파스칼 케이스 ex) PostList.tsx
- 함수명 - 함수 네이밍은 동사 + 명사 → getValue | getRandomNumber | fetchUsers | onChangeInput
- 변수명, 함수명 작성 시, 줄임말 쓰지 않고 풀 네임 (btn x → button o)
    - Nav는 예외적으로 가능
- 이벤트 넣는 칸 이름 : on~ / 이벤트 발생 시 작동하는 함수 이름 : handle~
- 중괄호는 생략하지 않는다.

이벤트 핸들러

- 현재 컴포넌트 이벤트 핸들러 - on + eventName : on[이벤트][이벤트 대상]
- props로 받는 이벤트 핸들러 - handle : handle[이벤트][이벤트 대상]
- 함수 네이밍 규칙 동일하게 동사 + 명사 규칙을 따릅니다.
- 화살표 함수 사용
- `styled` 부분 컴포넌트 아래에 쓰기
- 타입
    - 객체: `interface`
    - 복잡한 타입(union, intersection..), 유틸(ReturnType, Omit..) 등: `type`
- boolean 타입
    - 변수명: is + -
    - 함수명: check + -
- css 크기 단위: px, rem (보류), 함수, 짝수
- 함수 타입 필요시에만 사용
- 비구조화 할당 - 추후 논의..
- 이벤트 객체 네임 - `e`
- 주석 - TODO, FIX

```tsx
// TODO: 로그인 기능 구현하기
// FIX: ~ 버그 수정하기
```

- import order: react > 라이브러리 > component > hook
- alias 절대 경로 /src ⇒ `@`
- 같은 폴더 위치라면 상대경로로 그 외에는 절대경로 사용

### 5. Issue 및 PR 전략

---

- 머지데이 - 스프린트 끝날 때 다같이 머지 하자
- 스크럼 시간에 스프린트도 유동적으로
- 개발 순서 : **Issue > kanban 보드 > 개발 > 커밋 > PR > Merge > Issue 닫기 & kanban 보드**

**Issue 템플릿(임시)**

> **Issue 제목 : [Prefix] - 구현 내용**
> 
- **Prefix 내용**
    
    **인증, 포스트 피드, 상단 메뉴, 포스트, 검색, 포스트 작성, 유저 페이지, 마이 페이지, 알림, 404**
    

```markdown
## 📑 구현 사항

- [ ] 구현할 사항 작성

</br>

## 🚧 특이 사항

이슈를 읽을 때 참고할 사항 작성
```

**PR 템플릿 (임시)**

> **PR 제목 : [Prefix] - 구현 내용 (간단히 한 줄로)**
> 

```markdown
## 📑 구현 사항 

- [ ] 구현한 사항 작성

<br/>

## 🚧 특이 사항

- [ ] 

</br>

## 🚨관련 이슈

#이슈번호
```
