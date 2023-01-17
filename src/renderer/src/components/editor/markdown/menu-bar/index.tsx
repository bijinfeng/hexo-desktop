import { Divider as ArcoDivider } from '@arco-design/web-react';
import React from 'react';

import CreateTableButton from './create-table-button';
import RedoButton from './redo-button';
import ToggleBlockquoteButton from './toggle-blockquote-button';
import ToggleBoldButton from './toggle-bold-button';
import ToggleBulletListButton from './toggle-bullet-list-button';
import ToggleCodeBlockButton from './toggle-code-block-button';
import ToggleCodeButton from './toggle-code-button';
import ToggleHeadingButton from './toggle-heading-button';
import ToggleItalicButton from './toggle-italic-button';
import ToggleOrderedListButton from './toggle-ordered-list-button';
import ToggleStrikeButton from './toggle-strike-button';
import ToggleTaskListButton from './toggle-task-list-button';
import ToggleUnderlineButton from './toggle-underline-button';
import UndoButton from './undo-button';

const Divider = () => <ArcoDivider type="vertical" className="!m-0 !h-[16px]" />;

const MenuBar: React.FC = () => {
  return (
    <div className="flex items-center border-t border-t-border p-[10px] text-[20px] gap-[8px]">
      <UndoButton />
      <RedoButton />
      <Divider />
      <ToggleHeadingButton level={1} />
      <ToggleHeadingButton level={2} />
      <ToggleHeadingButton level={3} />
      <ToggleHeadingButton level={4} />
      <ToggleHeadingButton level={5} />
      <ToggleHeadingButton level={6} />
      <Divider />
      <ToggleBoldButton />
      <ToggleItalicButton />
      <ToggleStrikeButton />
      <ToggleUnderlineButton />
      <ToggleBlockquoteButton />
      <Divider />
      <ToggleOrderedListButton />
      <ToggleBulletListButton />
      <ToggleTaskListButton />
      <Divider />
      <ToggleCodeBlockButton />
      <ToggleCodeButton />
      <CreateTableButton />
    </div>
  );
};

export default MenuBar;
