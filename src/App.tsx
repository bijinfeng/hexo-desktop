import { Route, Routes } from 'react-router-dom';

import { GlobalContextProvider } from './context/GlobalContext';
import Favorites from './pages/favorites';
import Layout from './pages/layout';
import Notebooks from './pages/notebooks';
import Notes from './pages/notes';
import Setting from './pages/setting';
import SettingBasic from './pages/setting/basic';
import Trash from './pages/trash';

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="favorites" element={<Favorites />} />
          <Route path="notes" element={<Notes />} />
          <Route path="notebooks" element={<Notebooks />} />
          <Route path="trash" element={<Trash />} />
          <Route path="setting" element={<Setting />}>
            <Route path="" element={<SettingBasic />} />
          </Route>
        </Route>
      </Routes>
    </GlobalContextProvider>
  );
};

export default App;
