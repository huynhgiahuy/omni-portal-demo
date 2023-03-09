import './index.less';

import { Button, Input, List, Popover, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';

import Share from '../../../../public/share.svg';

export interface ListTransferButtonShareProps {
  id: string | number;
  label: string;
  value: string;
}

interface ButtonShareProps {
  open?: boolean;
  type?: string;
  handleUserTransfer?: (e: string) => void;
  onClickChangeCall?: (e: string) => void;
  listTransfer: ListTransferButtonShareProps[];
}

const ButtonShare: React.FC<ButtonShareProps> = ({
  open,
  type,
  listTransfer,
  handleUserTransfer,
  onClickChangeCall,
}) => {
  const [userSelect, setUserSelect] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);

    return () => {
      setIsOpen(false);
    };
  }, [open, type]);

  const submit = () => {
    setIsOpen(false);
    onClickChangeCall && onClickChangeCall(userSelect);
  };

  return (
    <div className="a-button-share">
      <img
        src={Share}
        alt="share"
        className={'a-button-share__phone-share'}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Popover
        open={isOpen}
        trigger="click"
        className="flex"
        content={
          <>
            <div style={{ marginTop: 20 }}>
              <Typography.Text>Chuyển tiếp</Typography.Text>
              <Typography.Text className="a-button-share__forward-phone">
                {` Danh sách nhân sự đang online trong hệ thống`}
              </Typography.Text>
            </div>
            <Input
              size="large"
              placeholder="Chọn nhân sự"
              style={{ margin: '10px 0' }}
              value={userSelect}
              onChange={(e) => {
                setUserSelect(e.target.value);
                handleUserTransfer && handleUserTransfer(e.target.value);
              }}
            />
            <List
              bordered
              className="a-button-share__list-transfer"
              size="small"
              dataSource={listTransfer}
              renderItem={(item: { label: string; value: string }, index) => (
                <List.Item
                  key={`${item.label}-${index}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setUserSelect(item.label);
                  }}
                >
                  <List.Item.Meta
                    avatar={<UserOutlined />}
                    title={`${item.label} - ${item.value}`}
                  />
                </List.Item>
              )}
            />
            <div className={'a-button-share__forward-select-button'}>
              <Button style={{ marginRight: '10px' }} onClick={() => setIsOpen(!isOpen)}>
                Hủy
              </Button>
              <Button type="primary" disabled={!userSelect} onClick={submit}>
                Chuyển
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
};

export default ButtonShare;
