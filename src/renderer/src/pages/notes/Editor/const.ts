import { ActionItem } from '@/components/action-dropdown';

export enum EditorActions {
  ADD_TAG = 'add_tag',
  MOVE = 'move',
}

export const editorActions: ActionItem[] = [
  { key: EditorActions.ADD_TAG, title: '标签' },
  { key: EditorActions.MOVE, title: '移动到' },
];
