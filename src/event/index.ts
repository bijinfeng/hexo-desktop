import EventManager from 'eventemitter3';

export enum EventType {
  OPEN_SETTING_MODAL = 'OPEN_SETTING_MODAL',
  OPEN_FILE_MOVE_MODAL = 'OPEN_FILE_MOVE_MODAL',
}

export const AppEventManager = new EventManager();
