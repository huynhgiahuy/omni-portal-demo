import { CheckCircleFilled, ClockCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { Select, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import Ellipse from '../../assets/Ellipse.svg';

const WorkingStatus = () => {
  const [option, setOption] = useState('ready');

  return (
    <Space size={0} align="center">
      <Select
        bordered={false}
        className={styles['status-container']}
        value={option}
        onSelect={(value: string) => {
          setOption(value);
        }}
        dropdownStyle={{ width: 155 }}
        dropdownMatchSelectWidth={false}
      >
        <Select.Option value="ready">
          <CheckCircleFilled style={{ color: ' #1eaf61' }} />
          <span style={{ color: '#1890FF' }} className={styles['text-status']}>
            Sẵn sàng
          </span>
        </Select.Option>
        <Select.Option value="absent">
          <ClockCircleFilled style={{ color: ' #FAAD14' }} />
          <span style={{ color: '#FAAD14' }} className={styles['text-status']}>
            Vắng mặt
          </span>
        </Select.Option>
        <Select.Option value="not_disturb">
          <MinusCircleFilled style={{ color: '#F5222D' }} />
          <span style={{ color: '#F5222D' }} className={styles['text-status']}>
            Không làm phiền
          </span>
        </Select.Option>
        <Select.Option value="not_ready">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Ellipse} alt="..." width={14} height={14} />
            <div style={{ color: '#818181' }} className={styles['text-status']}>
              Không hoạt động
            </div>
          </div>
        </Select.Option>
      </Select>
    </Space>
  );
};

export default WorkingStatus;
