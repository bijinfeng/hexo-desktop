import { ConfigProvider } from '@arco-design/web-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import FileMove from '@/components/file-move';
import { themeState } from '@/models/theme';

import Layout from './pages/layout';
import Notes from './pages/notes';
import Setting from './pages/setting';
import Trash from './pages/trash';

const App: React.FC = () => {
  const themeLoadable = useRecoilValueLoadable(themeState);
  const isLoading = themeLoadable.state === 'loading';

  if (isLoading) return null;

  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="notes" element={<Notes />} />
          <Route path="trash" element={<Trash />} />
          <Route path="setting" element={<Setting />} />
          <Route path="/" element={<Navigate to="/notes" replace />} />
        </Route>
      </Routes>

      <FileMove />
    </ConfigProvider>
  );
};

export default App;
