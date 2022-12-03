import { ConfigProvider } from '@arco-design/web-react';
import { Navigate, Route, Routes } from 'react-router-dom';

import FileMove from '@/components/file-move';
import { useThemeStore } from '@/models/theme';

import Layout from './pages/layout';
import Notes from './pages/notes';
import Setting from './pages/setting';
import Trash from './pages/trash';

const App: React.FC = () => {
  const { loading } = useThemeStore();

  if (loading) return null;

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
