import { Suspense, lazy } from 'react';
import LoadingPage from '@/pc/components/Loading.jsx';

const Loading = <LoadingPage />;
const Main = lazy(() => import('@/mobile/pages/MMainPage')); /*메인페이지*/
const Login = lazy(() => import('@/mobile/pages/MLoginPage')); /*로그인페이지*/
const Join = lazy(() => import('@/mobile/pages/MJoinPage')); /*회원가입페이지*/
const NotFound = lazy(() => import('@/mobile/pages/MNotFoundPage')); /*애러페이지*/
const Test = lazy(() => import('@/mobile/pages/TestPage'));

const root = [
  {
    path: '/mo',
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: '/mo/test',
    element: (
      <Suspense fallback={Loading}>
        <Test />
      </Suspense>
    ),
  },
  {
    path: '/mo/login',
    element: (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/mo/Join',
    element: (
        <Suspense fallback={Loading}>
          <Join />
        </Suspense>
    ),
  },
  {
    path: '/*',
    element: (
        <Suspense fallback={Loading}>
          <NotFound />
        </Suspense>
    ),
  },
];

export default root;


