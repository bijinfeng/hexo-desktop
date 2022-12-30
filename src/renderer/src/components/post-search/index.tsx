import {
  Button,
  Divider,
  Input,
  Radio,
  Trigger,
  Typography,
} from '@arco-design/web-react';
import { IconDelete, IconSearch } from '@arco-design/web-react/icon';
import { get, isEmpty, isEqual } from 'lodash-es';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import IconButton from '@/components/icon-button';

import { useQueryStorage } from './userQueryStorage';

type InputProps = React.ComponentProps<typeof Input>;

export interface PostSearchProps {
  scopes?: Array<{ key: string; label: string }>;
  onChange: (value: string, scope: string) => void;
}

const DURATION = 200;

const PostSearch: React.FC<PostSearchProps> = ({ scopes = [], onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [visible, setVisible] = useState(false);
  const preScopes = useRef(() => [...scope]);
  const [scope, setScope] = useState<string>(() => get(scopes, [0, 'key']));
  const { query, setQuery, clearQuery } = useQueryStorage();

  const hasQuery = !isEmpty(query);
  const hasScope = !isEmpty(scopes);

  useEffect(() => {
    if (!isEqual(scopes, preScopes.current)) {
      setScope(get(scopes, [0, 'key']));
    }
  }, [scopes]);

  const handleChange = useCallback(
    (value = '') => {
      setQuery(value);
      setInputValue(value);
      onChange(value, scope);
    },
    [scope],
  );

  const handleClear = useCallback(() => {
    setTimeout(clearQuery, DURATION);
  }, []);

  const onPressEnter = useCallback<Required<InputProps>['onPressEnter']>((e) => {
    setVisible(false);
    handleChange(e.target.value);
  }, []);

  const handleScopeChange = useCallback(
    (_scope: string) => {
      setScope(_scope);
      onChange(inputValue, _scope);
    },
    [inputValue],
  );

  const renderLogs = () => {
    if (!hasQuery) return null;

    return (
      <>
        <div className="flex items-center justify-between">
          <Typography.Text>最近搜索：</Typography.Text>
          <IconButton onClick={handleClear}>
            <IconDelete />
          </IconButton>
        </div>
        <div className="flex flex-wrap">
          {query.map((name) => (
            <Button
              key={name}
              className="!px-[6px] !h-[22px] mt-2 mr-2"
              type="secondary"
              shape="round"
              size="mini"
              onClick={() => handleChange(name)}
            >
              {name}
            </Button>
          ))}
        </div>
      </>
    );
  };

  const renderScope = () => {
    if (!hasScope) return null;

    return (
      <>
        <Typography.Text>搜索范围：</Typography.Text>
        <Radio.Group className="!block" value={scope} onChange={handleScopeChange}>
          {scopes.map((it) => (
            <Radio key={it.key} className="mt-2 !p-0" value={it.key}>
              {it.label}
            </Radio>
          ))}
        </Radio.Group>
      </>
    );
  };

  const renderPopup = () => (
    <div className="arco-trigger-popup w-full">
      {renderLogs()}
      {hasQuery && hasScope && <Divider className="!my-2.5" />}
      {renderScope()}
    </div>
  );

  return (
    <div className="flex-1 relative" ref={containerRef}>
      <Trigger
        popupVisible={visible}
        onVisibleChange={setVisible}
        trigger="focus"
        disabled={!(hasQuery || hasScope)}
        popup={renderPopup}
        popupAlign={{ bottom: 6 }}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getPopupContainer={() => containerRef.current!}
        className="w-full"
        duration={DURATION}
      >
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="搜索笔记"
          prefix={<IconSearch />}
          className="arco-round-input"
          allowClear
          onClear={handleChange}
          onPressEnter={onPressEnter}
        />
      </Trigger>
    </div>
  );
};

export default PostSearch;
