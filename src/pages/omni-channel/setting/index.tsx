import React, { useState } from 'react';
import { Segmented } from 'antd';
import { UserOutlined, ContainerOutlined, TeamOutlined } from '@ant-design/icons';
import styles from '../setting/style.less';
import PersonalInfo from './PersonalInfo';
import ShiftInfo from './ShiftInfo';

const Setting: React.FC = () => {
  const [isChangeView, setChangeView] = useState<String | Number>('Thông tin cá nhân');
  const handleChangeSegmented = (value: String | Number) => {
    setChangeView(value);
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Segmented
          size='middle'
          options={[
            {
              label: 'Thông tin cá nhân',
              value: 'Thông tin cá nhân',
              icon: <UserOutlined />
            },
            {
              label: 'Thông tin ca trực',
              value: 'Thông tin ca trực',
              icon: <ContainerOutlined />
            },
            {
              label: 'Nhóm quyền',
              value: 'Nhóm quyền',
              icon: <TeamOutlined />
            },
          ]}
          className={styles.antSegmented}
          onChange={handleChangeSegmented}
          style={{ backgroundColor: "#e3eaf4" }}
        />
      </div>
      {isChangeView === 'Thông tin cá nhân' ? (
        <PersonalInfo />
      ) : isChangeView === 'Thông tin ca trực' ? (
        <ShiftInfo />
      ) : (
        ''
      )}
    </>
  )
}

export default Setting;
