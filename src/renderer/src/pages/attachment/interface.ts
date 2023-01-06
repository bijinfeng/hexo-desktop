export interface AttachmentListProps {
  data: PICGO.IPicAttachment[];
  selectedKeys: Array<string | number>;
  setSelectedKeys: (value: Array<string | number>) => void;
}
