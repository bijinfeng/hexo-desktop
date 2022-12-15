import EventManager from 'eventemitter3';

export enum EventType {
  VISIBLE_FILE_SEARCH = 'VISIBLE_FILE_SEARCH',
  OPEN_FILE_MOVE_MODAL = 'OPEN_FILE_MOVE_MODAL',
  OPEN_UPLOAD_MODAL = 'OPEN_UPLOAD_MODAL',
  OPEN_SETTING = 'OPEN_SETTING',
  CLOSE_SETTING = 'CLOSE_SETTING',
}

export const AppEventManager = new EventManager();
