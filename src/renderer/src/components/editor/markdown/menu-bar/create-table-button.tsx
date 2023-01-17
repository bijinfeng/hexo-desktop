import React from 'react';
import { RiTable2 } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const CreateTableButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run()
      }
      enabled={editor.can().chain().focus().insertTable().run()}
      active={editor.isActive('table')}
      icon={<RiTable2 />}
    />
  );
};

export default CreateTableButton;
