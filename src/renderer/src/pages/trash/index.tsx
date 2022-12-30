import React from 'react';

import ResizeSplit from '@/components/resize-split';
import { NoteProvider } from '@/hooks/use-note';

import Editor from './editor';
import List from './list';

const Trash: React.FC = () => (
  <NoteProvider>
    <ResizeSplit panes={[<List key="first" />, <Editor key="second" />]} />
  </NoteProvider>
);

export default Trash;
