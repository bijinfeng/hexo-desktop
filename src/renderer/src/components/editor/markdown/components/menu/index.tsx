import { Divider as ArcoDivider } from '@arco-design/web-react';
import React from 'react';

import { CopyButton } from './copy-button';
import { CreateTableButton } from './create-table-button';
import { CutButton } from './cut-button';
import { PasteButton } from './paste-button';
import { RedoButton } from './redo-button';
import { ToggleBlockquoteButton } from './toggle-blockquote-button';
import { ToggleBoldButton } from './toggle-bold-button';
import { ToggleBulletListButton } from './toggle-bullet-list-button';
import { ToggleCalloutButton } from './toggle-callout-button';
import { ToggleCodeBlockButton } from './toggle-code-block-button';
import { ToggleCodeButton } from './toggle-code-button';
import { ToggleHeadingButton } from './toggle-heading-button';
import { ToggleItalicButton } from './toggle-italic-button';
import { ToggleOrderedListButton } from './toggle-ordered-list-button';
import { ToggleStrikeButton } from './toggle-strike-button';
import { ToggleTaskListButton } from './toggle-task-list-button';
import { ToggleUnderlineButton } from './toggle-underline-button';
import { UndoButton } from './undo-button';

const Divider = () => <ArcoDivider type="vertical" className="!m-0 !h-[16px]" />;

const Menu: React.FC = () => {
  return (
    <div className="flex items-center border-y border-y-border p-[10px] text-[20px] gap-[8px]">
      <UndoButton />
      <RedoButton />
      <Divider />
      <ToggleHeadingButton attrs={{ leve: 1 }} />
      <ToggleHeadingButton attrs={{ leve: 2 }} />
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
      <Divider />
      <PasteButton />
      <CutButton />
      <CopyButton />
      <Divider />
      <ToggleCalloutButton />
    </div>
  );
};

export default Menu;
