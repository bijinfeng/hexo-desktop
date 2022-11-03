import { Route, Routes } from 'react-router-dom';

import Layout from './pages/layout';
import Setting from './pages/setting';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
