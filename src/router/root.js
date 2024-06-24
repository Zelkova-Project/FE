import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Loading = <div>Loading...</div>;
const Main = lazy(() => import('../pages/MainPage'));
const Login = lazy(() => import('../pages/LoginPage'));
const NoticeDetail = lazy(() => import('../pages/NoticeDetailPage'));
const NormalLogin = lazy(() => import('../pages/NormalLoginPage'));
const Oauth = lazy(() => import('../pages/OauthPage'));
const Join = lazy(() => import('../pages/JoinPage'));
const Guide = lazy(() => import('../pages/GuidePage'));
const Notice = lazy(() => import('../pages/NoticePage'));
const Hire = lazy(() => import('../pages/HirePage'));
const Write = lazy(() => import('../pages/WritePage'));
const Community = lazy(() => import('../pages/CommunityPage'));
const Support = lazy(() => import('../pages/SupportPage'));
const Chat = lazy(() => import('../pages/ChatPage'));
const MemberFind = lazy(() => import('../pages/MemberFindPage'));
const Profile = lazy(() => import('../pages/ProfilePage'));
const ProfileSetup = lazy(() => import('../pages/ProfileSetupPage'));
const Board = lazy(() => import('../components/common/BoardPage'));
const LatterWrite = lazy(() => import('../pages/LatterWritePage'));

const root = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/oauth',
    element: (
      <Suspense fallback={Loading}>
        <Oauth />
      </Suspense>
    ),
  },
  {
    path: '/join',
    element: (
      <Suspense fallback={Loading}>
        <Join />
      </Suspense>
    ),
  },
  {
    path: '/guide',
    element: (
      <Suspense fallback={Loading}>
        <Guide />
      </Suspense>
    ),
  },
  {
    path: '/notice',
    element: (
      <Suspense fallback={Loading}>
        <Notice />
      </Suspense>
    ),
  },
  {
    path: '/hire',
    element: (
      <Suspense fallback={Loading}>
        <Hire />
      </Suspense>
    ),
  },
  {
    path: '/write',
    element: (
      <Suspense fallback={Loading}>
        <Write />
      </Suspense>
    ),
  },
  {
    path: '/normalLogin',
    element: (
      <Suspense fallback={Loading}>
        <NormalLogin />
      </Suspense>
    ),
  },
  {
    path: '/noticeDetail/:id',
    element: (
      <Suspense fallback={Loading}>
        <NoticeDetail />
      </Suspense>
    ),
  },
  {
    path: '/community',
    element: (
      <Suspense fallback={Loading}>
        <Community />
      </Suspense>
    ),
  },
  {
    path: '/support',
    element: (
      <Suspense fallback={Loading}>
        <Support />
      </Suspense>
    ),
  },
  {
    path: '/chat',
    element: (
      <Suspense fallback={Loading}>
        <Chat />
      </Suspense>
    ),
  },
  {
    path: '/MemberFind',
    element: (
      <Suspense fallback={Loading}>
        <MemberFind />
      </Suspense>
    ),
  },
  {
    path: '/Profile',
    element: (
      <Suspense fallback={Loading}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: '/ProfileSetup',
    element: (
      <Suspense fallback={Loading}>
        <ProfileSetup />
      </Suspense>
    ),
  },
  {
    path: '/board/:boardName',
    element: (
      <Suspense fallback={Loading}>
        <Board />
      </Suspense>
    ),
  },
  {
    path: '/LatterWrite',
    element: (
      <Suspense fallback={Loading}>
        <LatterWrite />
      </Suspense>
    ),
  },
]);

export default root;
