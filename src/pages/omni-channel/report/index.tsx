import React, { useState } from 'react';
import { Segmented } from 'antd';
import GeneralStatistic from './GeneralStatistic';

import styles from '../report/style.less';

const Report: React.FC = () => {
  const [isChangeView, setChangeView] = useState<String | Number>('Thống kê chung');
  const handleChangeSegmented = (value: String | Number) => {
    setChangeView(value);
  };
  return (
    <>
      <Segmented
        options={[
          {
            label: 'Thống kê chung',
            value: 'Thống kê chung',
          },
          {
            label: 'Bàn giao ca trực',
            value: 'Bàn giao ca trực',
          },
          {
            label: 'Kế hoạch đêm',
            value: 'Kế hoạch đêm',
          },
          {
            label: 'Thông tin ca trực',
            value: 'Thông tin ca trực',
          },
          // {
          //   label: 'Năng suất nhân sự',
          //   value: 'Năng suất nhân sự',
          //   icon: <LineChartOutlined />,
          // },
          // {
          //   label: 'Lịch sử cuộc gọi',
          //   value: 'Lịch sử cuộc gọi',
          //   icon: <PhoneOutlined />,
          // },
        ]}
        className={styles.antSegmented}
        onChange={handleChangeSegmented}
        style={{ backgroundColor: '#e3eaf4' }}
      />
      {isChangeView === 'Thống kê chung' ? <GeneralStatistic /> : ''}
    </>
  );
};

export default Report;
