import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import root from '@/pc/router/root';
import rootMo from '@/mobile/router/rootMo';
import { createBrowserRouter } from 'react-router-dom';

function App() {
  const routes = createBrowserRouter([
    ...root,
    ...rootMo
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={routes} />
    </RecoilRoot>
  );
}

export default App;

