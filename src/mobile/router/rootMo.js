import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingPage from '@/pc/components/Loading.jsx';

const Loading = <LoadingPage />;
const Main = lazy(() => import('@/mobile/pages/MainPage'));

const root = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
]);

export default root;
