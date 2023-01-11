import { ConfigProvider } from '@arco-design/web-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import FileMove from '@/components/file-move';
import UploadModal from '@/components/upload-modal';
import { useThemeStore } from '@/models/theme';
import { useConfigStore } from '@/models/config';

import Attachment from './pages/attachment';
import Layout from './pages/layout';
import Notes from './pages/notes';
import Setting from './pages/setting';
import Trash from './pages/trash';

const App: React.FC = () => {
  const config = useConfigStore((state) => state.config);
  const loading = useThemeStore((state) => state.loading);

  if (loading && isEmpty(config)) return null;

  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="notes" element={<Notes />} />
          <Route path="trash" element={<Trash />} />
          <Route path="attachment" element={<Attachment />} />
          <Route path="collect" element={<Notes mode="collect" />} />
          <Route path="/" element={<Navigate to="/notes" replace />} />
        </Route>
      </Routes>

      <FileMove />
      <UploadModal />
      <Setting />
    </ConfigProvider>
  );
};

export default App;
