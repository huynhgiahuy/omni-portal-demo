import { CheckCircleFilled, ClockCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { message, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import Ellipse from '../../assets/Ellipse.svg';
import { useModel, useRequest } from 'umi';
import { requeGetUserInfoProps, requestUpdateStatusUser } from '@/services/user_info';
import useMousePosition from '@/hooks/useMousePosition';
import { useAtom } from 'jotai';
import { socketAtom } from '@/socketio';
import useSubWs from '@/hooks/useSocket';
import { dataProps } from '.';

const WorkingStatus = () => {
  const access_token = window.localStorage.getItem('access_token');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [socket] = useAtom(socketAtom);
  const [connectSocket, setConnectSocket] = useState(false);

  const { x, y } = useMousePosition();
  const [checkMouse, setCheckMouse] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  const [option, setOption] = useState<number>(
    initialState?.currentUser?.status
      ? initialState?.currentUser?.status == 5
        ? 1
        : initialState?.currentUser?.status
      : 1,
  );

  const updateStatusUser = useRequest(
    async (option: number) => {
      const res: { success: boolean; data: any } = await requestUpdateStatusUser(
        option,
        access_token ? access_token : '',
      );

      if (res.success) {
        setOption(res.data[0].status);
        socket?.emit('updated_user_status');
      } else {
        setOption(initialState?.currentUser?.status ? initialState?.currentUser?.status : 2);
        message.error('Chuyển trạng thái không thành công, vui lòng thử lại');
        return;
      }
    },
    {
      manual: true,
    },
  );

  //Check offline

  useEffect(() => {
    if (!isOnline && option === 1) {
      if (checkMouse) {
        const res = requestUpdateStatusUser(2, access_token ? access_token : '');
        res.then(async (result: requeGetUserInfoProps) => {
          if (result.success) {
            setOption(2);
            socket?.emit('updated_user_status');
            await setInitialState((s) => ({
              ...s,
              currentUser: { ...initialState?.currentUser, status: result.data[0] },
            }));
          }
        });
      }
    } else if (isOnline && option === 2) {
      const res = requestUpdateStatusUser(1, access_token ? access_token : '');
      res.then(async (result: requeGetUserInfoProps) => {
        if (result.success) {
          setOption(1);
          socket?.emit('updated_user_status');
          await setInitialState((s) => ({
            ...s,
            currentUser: { ...initialState?.currentUser, status: result.data[0] },
          }));
        }
      });
    }
  }, [isOnline, option, checkMouse]);

  useEffect(() => {
    if (checkMouse) {
      let timeMouse: NodeJS.Timeout;
      const handleMouseMove = () => {
        clearTimeout(timeMouse);
        setIsOnline(true);

        timeMouse = setTimeout(() => {
          setIsOnline(false);
        }, 300 * 1000);
      };
      document.addEventListener('mousemove', handleMouseMove);
      if (x == 0 && y == 0) {
        setTimeout(() => {
          setIsOnline(false);
        }, 300 * 1000);
      }
    }
  }, [x, y, checkMouse]);

  useSubWs('emit_call_event', (data: dataProps) => {
    const eventCall = data.event;
    switch (eventCall) {
      case 'hangup_call':
        setIsOnline(true);
        setCheckMouse(true);

        break;
      case 'answered_call':
        setIsOnline(true);
        setCheckMouse(false);
        break;
      default:
        break;
    }
  });

  useSubWs('updated_profile_status', (data: { status: number }) => {
    if (data.status) {
      setOption(data.status);
    }
  });

  useSubWs('connect', (data: { success: boolean }) => {
    if (data?.success) {
      setConnectSocket(true);
    }
  });
  useEffect(() => {
    if (connectSocket) {
      message.success('Sẵn sàng nhận cuộc gọi');
    }
  }, [connectSocket]);

  useSubWs('reload_user_status', (data: { user_id: string; status: number }) => {
    if (data.user_id === initialState?.currentUser?.user_id) {
      updateStatusUser.run(data.status);
    }
  });

  return (
    <Space size={0} align="center">
      <Select
        bordered={false}
        className={styles['status-container']}
        value={option}
        onSelect={(value: number) => {
          setOption(value);
          updateStatusUser.run(value);
        }}
        dropdownStyle={{ width: 155 }}
        dropdownMatchSelectWidth={false}
      >
        <Select.Option value={1}>
          <CheckCircleFilled style={{ color: ' #1eaf61' }} />
          <span style={{ color: '#1890FF' }} className={styles['text-status']}>
            Sẵn sàng
          </span>
        </Select.Option>
        <Select.Option value={2} disabled={true}>
          <ClockCircleFilled style={{ color: ' #FAAD14' }} />
          <span style={{ color: '#FAAD14' }} className={styles['text-status']}>
            Vắng mặt
          </span>
        </Select.Option>
        <Select.Option value={3}>
          <MinusCircleFilled style={{ color: '#F5222D' }} />
          <span style={{ color: '#F5222D' }} className={styles['text-status']}>
            Không làm phiền
          </span>
        </Select.Option>
        <Select.Option value={4}>
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
