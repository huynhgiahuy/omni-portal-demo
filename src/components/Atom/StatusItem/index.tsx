import './index.less';

import React from 'react';

import { CheckCircleFilled, ClockCircleFilled, MinusCircleFilled } from '@ant-design/icons';

import Ellipse from '../../../../public/Ellipse.svg';
import OfflineIcon from '../../../../public/offline.png';

interface StatusItemProps {
  status: 'ready' | 'abscent' | 'not-disturb' | 'no-activity' | 'offline';
}

const StatusItem: React.FC<StatusItemProps> = ({ status }) => {
  let content: string;
  let icon: React.ReactNode;

  switch (status) {
    case 'ready':
      content = 'Sẵn sàng';
      icon = <CheckCircleFilled />;
      break;

    case 'abscent':
      content = 'Vắng mặt';
      icon = <ClockCircleFilled />;
      break;

    case 'not-disturb':
      content = 'Không làm phiền';
      icon = <MinusCircleFilled />;
      break;

    case 'no-activity':
      content = 'Không hoạt động';
      icon = <img src={Ellipse} alt="..." width={14} height={14} />;
      break;

    default:
      status = 'offline';
      content = 'Đang offline';
      icon = <img src={OfflineIcon} width={14} height={14} />;
      break;
  }
  return (
    <div className="a-status-item">
      <div className={`a-status-item__tag a-status-item--${status}`}>
        {icon}
        <span className="a-status-item__content">{content}</span>
      </div>
    </div>
  );
};

export default StatusItem;
