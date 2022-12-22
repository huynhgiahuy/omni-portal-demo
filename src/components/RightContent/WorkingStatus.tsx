import { CheckCircleFilled, ClockCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { message, Select, Space } from 'antd';
import { useContext, useEffect, useState } from 'react';
import styles from './index.less';
import Ellipse from '../../assets/Ellipse.svg';
import { useModel, useRequest } from 'umi';
import { requeGetUserInfoProps, requestUpdateStatusUser } from '@/services/user_info';
import useMousePosition from '@/hooks/useMousePosition';
import { wsContext } from '@/contexts/socketioContext';

const WorkingStatus = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const wsContextValue = useContext(wsContext);
  const { x, y } = useMousePosition();
  const [checkMouse, setCheckMouse] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  const token = window.localStorage.getItem('access_token');
  const [option, setOption] = useState<number>(
    initialState?.currentUser?.status ? initialState?.currentUser?.status : 1,
  );

  const updateStatusUser = useRequest(
    async (option: number) => {
      const res: { success: boolean; data: any } = await requestUpdateStatusUser(
        option,
        token ? token : '',
      );

      if (res.success) {
        setOption(res.data[0].status);
        wsContextValue.socketio.emit('updated_user_status');
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
        const res = requestUpdateStatusUser(2, token ? token : '');
        res.then(async (result: requeGetUserInfoProps) => {
          if (result.success) {
            setOption(2);
            wsContextValue.socketio.emit('updated_user_status');
            await setInitialState((s) => ({
              ...s,
              currentUser: { ...initialState?.currentUser, status: result.data[0] },
            }));
          }
        });
      }
    } else if (isOnline && option === 2) {
      const res = requestUpdateStatusUser(1, token ? token : '');
      res.then(async (result: requeGetUserInfoProps) => {
        if (result.success) {
          setOption(1);
          wsContextValue.socketio.emit('updated_user_status');
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

    wsContextValue.socketio.on('emit_call_event', (data) => {
      const eventCall = data.event;
      switch (eventCall) {
        case 'hangup_call':
          setIsOnline(true);
          setCheckMouse(true);
          setTimeout(() => {
            setIsOnline(false);
          }, 300 * 1000);

          break;
        case 'answered_call':
          setIsOnline(true);
          setCheckMouse(false);
          break;
        default:
          break;
      }
    });
  }, [x, y]);

  useEffect(() => {
    wsContextValue.socketio.on('updated_profile_status', (data) => {
      if (data.status) {
        setOption(data.status);
      }
    });
  }, []);

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
