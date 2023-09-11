import {
  CreatePostPage,
  HomePage,
  LoginPage,
  MyPage,
  PostPage,
  SearchPage,
  SignUpPage,
  UserPage,
} from '@pages';

// todo: page 넣을 때 수정

export const routes = [
  { path: '/', name: 'home', title: 'ANGOLA', component: HomePage },
  {
    path: '/search/:target',
    name: 'search',
    title: '검색',
    component: SearchPage,
  },
  {
    path: '/signup',
    name: 'signUp',
    title: '회원 가입',
    component: SignUpPage,
  },
  { path: '/login', name: 'login', title: '로그인', component: LoginPage },
  {
    path: '/user/:userId',
    name: 'user',
    title: '유저 정보',
    component: UserPage,
  },
  { path: '/post/:postId', name: 'post', title: 'ANGOLA', component: PostPage },
  {
    path: '/create-post',
    name: 'createPost',
    title: '추가하기',
    component: CreatePostPage,
  },
  { path: '/mypage', name: 'myPage', title: '마이 페이지', component: MyPage },
];

export const redirects = [
  { from: '/post', to: '/' },
  { from: '/user', to: '/' },
  { from: '/search', to: '/search/post' },
];
