import {
  CreatePostPage,
  HomePage,
  LoginPage,
  MyPage,
  NotFoundPage,
  PostPage,
  SearchPage,
  SignUpPage,
  UserPage,
} from '@pages';
import type { Params, SearchParams } from '@hooks/useCurrentPage';

type RouteComponent<T> = (props: T) => JSX.Element;

export const routes: {
  path: string;
  name: string;
  title: string;
  component: RouteComponent<SearchParams & Params>;
}[] = [
  {
    path: '*',
    name: '404',
    title: '알 수 없는 페이지',
    component: NotFoundPage,
  },
  { path: '/', name: 'home', title: 'ANGOLA', component: HomePage },
  {
    path: '/search/:target',
    name: 'search',
    title: '에 대한 검색 결과',
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
