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
  authRequired: boolean;
}[] = [
  {
    path: '*',
    name: '404',
    title: '알 수 없는 페이지',
    component: NotFoundPage,
    authRequired: false,
  },
  {
    path: '/',
    name: 'home',
    title: 'ANGOLA',
    component: HomePage,
    authRequired: false,
  },
  {
    path: '/search/:target',
    name: 'search',
    title: '에 대한 검색 결과',
    component: SearchPage,
    authRequired: false,
  },
  {
    path: '/signup',
    name: 'signUp',
    title: '회원 가입',
    component: SignUpPage,
    authRequired: false,
  },
  {
    path: '/login',
    name: 'login',
    title: '로그인',
    component: LoginPage,
    authRequired: false,
  },
  {
    path: '/user/:userId',
    name: 'user',
    title: '유저 정보',
    component: UserPage,
    authRequired: false,
  },
  {
    path: '/post/:postId',
    name: 'post',
    title: 'ANGOLA',
    component: PostPage,
    authRequired: false,
  },
  {
    path: '/create-post',
    name: 'createPost',
    title: '추가하기',
    component: CreatePostPage,
    authRequired: true,
  },
  {
    path: '/mypage',
    name: 'myPage',
    title: '마이 페이지',
    component: MyPage,
    authRequired: true,
  },
];

export const redirects = [
  { from: '/post', to: '/' },
  { from: '/user', to: '/' },
  { from: '/search', to: '/search/post' },
];
