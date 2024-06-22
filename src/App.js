import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import root from './router/root';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={root} />
    </RecoilRoot>
  );
}

export default App;
