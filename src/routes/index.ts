import {
  CreatePost,
  Home,
  Login,
  MyPage,
  Post,
  Search,
  Signup,
  User,
} from '@pages';

// todo: page 넣을 때 수정

export const routes = [
  { path: '/', name: 'home', title: 'ANGOLA', component: Home },
  { path: '/search/:target', name: 'search', title: '검색', component: Search },
  { path: '/signup', name: 'signup', title: '회원 가입', component: Signup },
  { path: '/login', name: 'login', title: '로그인', component: Login },
  { path: '/user/:userId', name: 'user', title: '유저 정보', component: User },
  { path: '/post/:postId', name: 'post', title: 'ANGOLA', component: Post },
  {
    path: '/create-post',
    name: 'createPost',
    title: '추가하기',
    component: CreatePost,
  },
  { path: '/mypage', name: 'myPage', title: '마이 페이지', component: MyPage },
];

export const redirects = [
  { from: '/post', to: '/' },
  { from: '/user', to: '/' },
  { from: '/search', to: '/search/post' },
];
