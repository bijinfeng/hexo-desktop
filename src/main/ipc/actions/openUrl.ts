import { shell } from 'electron';

export interface Args {
  url: string;
}

export default ({ url }: Args) => {
  shell.openExternal(url);
};
