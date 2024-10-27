import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingPage from '@/pc/components/Loading.jsx';

const Loading = <LoadingPage />;
const Main = lazy(() => import('@/mobile/pages/MainPage'));
const Test = lazy(() => import('@/mobile/pages/TestPage'));

const root = createBrowserRouter([
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
]);

export default root;
