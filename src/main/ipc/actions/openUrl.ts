import { shell } from 'electron';

export interface Args {
  payload: { url: string };
}

export default ({ payload }: Args) => {
  shell.openExternal(payload.url);
};
