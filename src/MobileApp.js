import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import rootMo from '@/mobile/router/rootMo';
import { createBrowserRouter } from 'react-router-dom';

function MobileApp() {
  const routes = createBrowserRouter(rootMo);

  return (
    <RecoilRoot>
      <RouterProvider router={routes} />
    </RecoilRoot>
  );
}

export default MobileApp;



