import './index.less';

import { Space, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';

export interface MarkerMapProps {
  id?: string | number;
  name?: string;
  color?: 'red' | 'green' | 'yellow' | 'orange' | 'mustard';
  lat?: number;
  lng?: number;
  popName?: string;
  branchName?: string;
  problem?: number;
  khah?: number;
}
const MarkerMap: React.FC<MarkerMapProps> = ({
  id,
  name,
  color,
  popName,
  branchName,
  problem,
  khah,
}) => {
  return (
    <Tooltip
      title={
        <Space direction="vertical">
          <div className="a-marker-map__tooltip">
            <div>Tên POP</div>
            <div>{popName}</div>
          </div>
          <div className="a-marker-map__tooltip">
            <div>Tên CNH</div>
            <div>{branchName}</div>
          </div>
          <div className="a-marker-map__tooltip">
            <div>Số lượng sự cố</div>
            <div>{problem}</div>
          </div>
          <div className="a-marker-map__tooltip">
            <div>Số lượng KHAH</div>
            <div>{khah}</div>
          </div>
        </Space>
      }
    >
      <div className={classNames('a-marker-map', `a-marker-map--${color}`)} />
    </Tooltip>
  );
};

export default MarkerMap;
