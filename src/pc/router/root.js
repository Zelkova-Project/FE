import { Suspense, lazy } from 'react';
import LoadingPage from '@/pc/components/Loading.jsx';

const Loading = <LoadingPage />;
const Main = lazy(() => import('@/pc/pages/MainPage'));
const Login = lazy(() => import('@/pc/pages/LoginPage'));
const NoticeDetail = lazy(() => import('@/pc/pages/NoticeDetailPage'));
const NormalLogin = lazy(() => import('@/pc/pages/NormalLoginPage'));
const Oauth = lazy(() => import('@/pc/pages/OauthPage'));
const Join = lazy(() => import('@/pc/pages/JoinPage'));
const Guide = lazy(() => import('@/pc/pages/GuidePage'));
const Notice = lazy(() => import('@/pc/pages/NoticePage'));
const Hire = lazy(() => import('@/pc/pages/HirePage'));
const Write = lazy(() => import('@/pc/pages/WritePage'));
const Community = lazy(() => import('@/pc/pages/CommunityPage'));
const Support = lazy(() => import('@/pc/pages/SupportPage'));
const Chat = lazy(() => import('@/pc/pages/ChatPage'));
const TempChat = lazy(() => import('@/pc/pages/TempChat'));
const MemberFind = lazy(() => import('@/pc/pages/MemberFindPage'));
const Profile = lazy(() => import('@/pc/pages/ProfilePage'));
const ProfileSetup = lazy(() => import('@/pc/pages/ProfileSetupPage'));
const Board = lazy(() => import('@/pc/components/common/BoardPage'));
const BoardDetail = lazy(() => import('@/pc/components/common/BoardDetailPage'));
const LatterWrite = lazy(() => import('@/pc/pages/LatterWritePage'));
const KakaoRedirectPage = lazy(() => import('@/pc/pages/members/KakaoRedirectPage.jsx'));
const NotFound = lazy(() => import('@/pc/pages/NotFound'));
const MoMain = lazy(() => import('@/mobile/pages/MMainPage')); /*메인페이지*/
import ChatListPage from '../pages/ChatListPage';

const root = [
  {
    path: '/mo',
    element: (
      <Suspense fallback={Loading}>
        <MoMain />
      </Suspense>
    ),
  },  
  {
    path: '/',
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
        <TempChat />
      </Suspense>
    ),
  },
  {
    path: '/memberFind',
    element: (
      <Suspense fallback={Loading}>
        <MemberFind />
      </Suspense>
    ),
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={Loading}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: '/profileSetup',
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
    path: '/detail/:boardName/:bno',
    element: (
      <Suspense fallback={Loading}>
        <BoardDetail />
      </Suspense>
    ),
  },
  {
    path: '/latterWrite',
    element: (
      <Suspense fallback={Loading}>
        <LatterWrite />
      </Suspense>
    ),
  },
  {
    path: '/member/kakao',
    element: (
      <Suspense fallback={Loading}>
        <KakaoRedirectPage />
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
  {
    path: '/chatroom/:roomName',
    element: (
      <Suspense fallback={Loading}>
        <ChatListPage />
      </Suspense>
    ),
  },
  {
    path: '/testchat',
    element: (
      <Suspense fallback={Loading}>
        <Chat />
      </Suspense>
    ),
  },
];

export default root;

