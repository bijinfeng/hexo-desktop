import { Divider } from '@arco-design/web-react';
import React, { useContext } from 'react';

import { ReactComponent as IconAudio } from '@/assets/icons/attachment/audio.svg';
import { ReactComponent as IconDoc } from '@/assets/icons/attachment/doc.svg';
import { ReactComponent as IconImage } from '@/assets/icons/attachment/image.svg';
import { ReactComponent as IconVideo } from '@/assets/icons/attachment/video.svg';

import { SearchContext } from './context';
import Item from './item';

export const fileTypes = [
  {
    type: 'image',
    icon: <IconImage />,
    name: '图片',
  },
  {
    type: 'video',
    icon: <IconVideo />,
    name: '视频',
  },
  {
    type: 'doc',
    icon: <IconDoc />,
    name: '文档',
  },
  {
    type: 'audio',
    icon: <IconAudio />,
    name: '音频',
  },
];

const FileType: React.FC = () => {
  const { searchState, setSearchState } = useContext(SearchContext);

  if (searchState.type || searchState.keyword) return null;

  return (
    <>
      <Divider className="!m-0" />
      <div className="px-3 py-2">
        {fileTypes.map((item) => (
          <Item
            key={item.type}
            bold
            preIcon={item.icon}
            onClick={() => setSearchState({ type: item.type })}
          >
            {item.name}
          </Item>
        ))}
      </div>
    </>
  );
};

export default FileType;
