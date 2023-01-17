import type { Editor } from '@tiptap/react';
import { createContext, useContext } from 'react';

export interface MarkdownState {
  editor: Editor;
}

export const MarkdownContext = createContext({} as MarkdownState);

export const useMarkdownContext = () => {
  return useContext(MarkdownContext);
};
