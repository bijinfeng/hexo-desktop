import React from 'react';

import ResizeSplit from '@/components/resize-split';
import { NoteProvider } from '@/hooks/use-note';

import Editor from './editor';
import List from './list';
import CollectList from './list/collect';

interface NotesProps {
  mode?: 'collect';
}

const Notes: React.FC<NotesProps> = ({ mode }) => {
  return (
    <NoteProvider>
      <ResizeSplit
        panes={[
          mode === 'collect' ? <CollectList key="first" /> : <List key="first" />,
          <Editor key="second" />,
        ]}
      />
    </NoteProvider>
  );
};

export default Notes;
