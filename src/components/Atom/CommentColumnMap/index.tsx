import './index.less';

import { Typography } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface CommentColumnMapProps {}

const CommentColumnMap: React.FC<CommentColumnMapProps> = () => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    console.log(list);
  }, [list]);

  const addList = (data: string) => {
    const index = list.findIndex((item) => item === data);
    if (index == -1) {
      return setList([...list, data]);
    }
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };
  return (
    <div className="a-comment-column-map">
      <Typography.Title level={5} style={{ margin: '0px 10px' }}>
        MỨC ĐỘ CHẤT LƯỢNG
      </Typography.Title>
      <div
        style={{ borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }}
        className={classNames(
          'a-comment-column-map__size',
          'a-comment-column-map--green',
          list.includes('=0') && 'a-comment-column-map__selected',
        )}
        onClick={() => {
          addList('=0');
        }}
      >
        =0
      </div>
      <div
        className={classNames(
          'a-comment-column-map__size',
          'a-comment-column-map--yellow',
          list.includes('<5p') && 'a-comment-column-map__selected',
        )}
        onClick={() => {
          addList('<5p');
        }}
      >{`<5p`}</div>
      <div
        className={classNames(
          'a-comment-column-map__size',
          'a-comment-column-map--mustard',
          list.includes('<1h') && 'a-comment-column-map__selected',
        )}
        onClick={() => {
          addList('<1h');
        }}
      >{`<1h`}</div>
      <div
        className={classNames(
          'a-comment-column-map__size',
          'a-comment-column-map--orange',
          list.includes('1-24h') && 'a-comment-column-map__selected',
        )}
        onClick={() => {
          addList('1-24h');
        }}
      >
        1-24h
      </div>
      <div
        style={{ borderTopRightRadius: 3, borderBottomRightRadius: 3 }}
        className={classNames(
          'a-comment-column-map__size',
          'a-comment-column-map--red',
          list.includes('>24h') && 'a-comment-column-map__selected',
        )}
        onClick={() => {
          addList('>24h');
        }}
      >{`>24h`}</div>
    </div>
  );
};

export default CommentColumnMap;
