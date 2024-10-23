import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import rootMo from './router/rootMo';

function MobileApp() {
  return (
    <RecoilRoot>
      <RouterProvider router={rootMo} />
    </RecoilRoot>
  );
}

export default MobileApp;

