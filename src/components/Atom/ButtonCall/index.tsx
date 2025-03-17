import './index.less';

import React from 'react';

import { AudioFilled, CaretRightOutlined, PauseOutlined, PhoneOutlined } from '@ant-design/icons';

interface ButtonCallProps {
  type: 'reveice' | 'hang-up' | 'mute' | 'un-mute' | 'pause' | 'play';
  onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
}

const ButtonCall: React.FC<ButtonCallProps> = ({ type, onClick }) => {
  return (
    <div className="a-button-call">
      {type === 'reveice' || type === 'hang-up' ? (
        <PhoneOutlined className={`a-button-call__${type}`} onClick={onClick} />
      ) : type === 'pause' ? (
        <CaretRightOutlined className={`a-button-call__${type}`} onClick={onClick} />
      ) : type === 'play' ? (
        <PauseOutlined className={`a-button-call__${type}`} onClick={onClick} />
      ) : (
        <>
          <AudioFilled className={`a-button-call__${type}`} onClick={onClick} />
        </>
      )}
    </div>
  );
};

export default ButtonCall;
