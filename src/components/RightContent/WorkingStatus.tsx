import { CheckCircleFilled, ClockCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { message, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import Ellipse from '../../assets/Ellipse.svg';
import { useModel } from 'umi';
import { requeGetUserInfoProps, requestUpdateStatusUser } from '@/services/user_info';

const WorkingStatus = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const token = window.localStorage.getItem('access_token');
  const [option, setOption] = useState(
    initialState?.currentUser?.status ? initialState?.currentUser?.status : '1',
  );

  useEffect(() => {
    if (
      option !== initialState?.currentUser?.status &&
      initialState?.currentUser?.status !== undefined
    ) {
      const res = requestUpdateStatusUser(option ? option : '1', token ? token : '');
      res.then(async (result: requeGetUserInfoProps) => {
        if (result.success) {
          await setInitialState((s) => ({
            ...s,
            currentUser: result.data[0],
          }));
        } else {
          setOption(initialState?.currentUser?.status ? initialState?.currentUser?.status : '2');
          message.error('Chuyển trạng thái không thành công, vui lòng thử lại');
          return;
        }
      });
    }
  }, [option]);

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
        <Select.Option value="1">
          <CheckCircleFilled style={{ color: ' #1eaf61' }} />
          <span style={{ color: '#1890FF' }} className={styles['text-status']}>
            Sẵn sàng
          </span>
        </Select.Option>
        <Select.Option value="2">
          <ClockCircleFilled style={{ color: ' #FAAD14' }} />
          <span style={{ color: '#FAAD14' }} className={styles['text-status']}>
            Vắng mặt
          </span>
        </Select.Option>
        <Select.Option value="3">
          <MinusCircleFilled style={{ color: '#F5222D' }} />
          <span style={{ color: '#F5222D' }} className={styles['text-status']}>
            Không làm phiền
          </span>
        </Select.Option>
        <Select.Option value="4">
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
