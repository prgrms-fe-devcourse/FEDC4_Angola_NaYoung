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
  { path: '/', title: 'home', component: Home },
  { path: '/search/:target', title: 'search', component: Search },
  { path: '/signup', title: 'signup', component: Signup },
  { path: '/login', title: 'login', component: Login },
  { path: '/user/:userId', title: 'user', component: User },
  { path: '/post/:postId', title: 'post', component: Post },
  { path: '/create-post', title: 'createPost', component: CreatePost },
  { path: '/mypage', title: 'myPage', component: MyPage },
];

export const redirects = [
  { from: '/post', to: '/' },
  { from: '/user', to: '/' },
  { from: '/search', to: '/search/post' },
];
