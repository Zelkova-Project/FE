import { RouterProvider } from 'react-router';
import { RecoilRoot } from 'recoil';
import root from '@/pc/router/root';
import rootMo from '@/mobile/router/rootMo';
import { createBrowserRouter } from 'react-router';

function App() {
  const routes = createBrowserRouter([
    ...root
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={routes} />
    </RecoilRoot>
  );
}

export default App;


