import { RouterProvider } from 'react-router';
import { RecoilRoot } from 'recoil';
import rootMo from '@/mobile/router/rootMo';
import { createBrowserRouter } from 'react-router';

function MobileApp() {
  const routes = createBrowserRouter(rootMo);

  return (
    <RecoilRoot>
      <RouterProvider router={routes} />
    </RecoilRoot>
  );
}

export default MobileApp;



