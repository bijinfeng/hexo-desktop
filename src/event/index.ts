import EventManager from '@/utils/event-manager';

export enum EventType {
  OPEN_SETTING_MODAL = 'OPEN_SETTING_MODAL',
}

export const AppEventManager = new EventManager();
