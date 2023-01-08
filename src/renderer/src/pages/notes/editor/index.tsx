import React from 'react';

import Illus from '@/components/illus';
import { useNote } from '@/hooks/use-note';

import FolderEditor from './folder';
import MarkdownEditor from './markdown';

const Editor: React.FC = () => {
  const { renderItem } = useNote();

  const renderContent = renderItem(
    {
      folder: ({ id }) => <FolderEditor folderId={id} />,
      post: ({ id }) => <MarkdownEditor postId={id} />,
    },
    <Illus.Empty />,
  );

  return <div className="h-full bg-bg-1">{renderContent()}</div>;
};

export default Editor;
