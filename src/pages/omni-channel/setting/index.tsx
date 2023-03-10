import React, { useState } from 'react';
import { Segmented } from 'antd';
import styles from '../setting/style.less';
import PersonalInfo from './PersonalInfo';
import ShiftInfo from './ShiftInfo';
import PermissionEdit from './PermissionEdit';
import HistoryCall from '../report/HistoryCall';
import PermissionRole from './PermissionRole';
import PhoneBook from '../report/PhoneBook';

const Setting: React.FC = () => {
  const [isChangeView, setChangeView] = useState<String | Number>('Thông tin cá nhân');
  const handleChangeSegmented = (value: String | Number) => {
    setChangeView(value);
  };
  return (
    <>
      <Segmented
        size="middle"
        options={[
          {
            label: 'Thông tin cá nhân',
            value: 'Thông tin cá nhân',
          },
          {
            label: 'Thông tin người dùng',
            value: 'Thông tin người dùng',
          },
          {
            label: 'Nhóm quyền',
            value: 'Nhóm quyền',
          },
          {
            label: 'Lịch sử cuộc gọi',
            value: 'Lịch sử cuộc gọi',
          },
          {
            label: 'Danh bạ',
            value: 'Danh bạ',
          },
        ]}
        className={styles.antSegmented}
        onChange={handleChangeSegmented}
        style={{ backgroundColor: '#e3eaf4', color: 'rgba(0,0,0,1)' }}
      />
      {isChangeView === 'Thông tin cá nhân' ? (
        <PersonalInfo />
      ) : isChangeView === 'Thông tin ca trực' ? (
        <ShiftInfo />
      ) : isChangeView === 'Lịch sử cuộc gọi' ? (
        <HistoryCall />
      ) : isChangeView === 'Danh bạ' ? (
        <PhoneBook />
      ) : isChangeView === 'Nhóm quyền' ? (
        <PermissionRole />
      ) : (
        <PermissionEdit />
      )}
    </>
  );
};

export default Setting;
