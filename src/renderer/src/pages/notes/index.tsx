import React from 'react';
import { useSearchParams } from 'react-router-dom';

import ResizeSplit from '@/components/resize-split';

import Editor from './editor';
import List from './list';

export type Mode = 'collect' | undefined;

const Trash: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') as Mode;

  return (
    <ResizeSplit panes={[<List key="first" mode={mode} />, <Editor key="second" />]} />
  );
};

export default Trash;
