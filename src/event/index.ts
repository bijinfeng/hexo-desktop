import Eventemitter from 'eventemitter3';

export enum EventType {
  OPEN_SETTING_MODAL = 'OPEN_SETTING_MODAL',
}

type EventTypes = {
  // 打开设置编辑弹窗
  [EventType.OPEN_SETTING_MODAL]: () => void;
};

/**
 * 发布订阅
 */
const pubsub = new Eventemitter<EventTypes>();

export default pubsub;
