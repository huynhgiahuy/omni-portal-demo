import { socketAtom } from '@/socketio';
import { message } from 'antd';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useModel } from 'umi';
const { UMI_API_BASE_URL } = process.env;

const omniChannel = `${UMI_API_BASE_URL}`;

const BasicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const access_token = localStorage.getItem('access_token');
  const { initialState } = useModel('@@initialState');
  const [, setSocket] = useAtom(socketAtom);

  useEffect(() => {
    if (initialState?.currentUser?.id) {
      const newSocket = io(omniChannel, {
        path: '/voip-service/ws/socket.io',
        transports: ['websocket'],
        query: {
          Authorization: access_token,
        },
      });
      newSocket.emit('authen_event', { token: access_token });
      setTimeout(() => {
        if (newSocket.connected) {
          message.success('Sẵn sàng nhận cuộc gọi');
        } else {
          message.error('Không sẵn sàng nhận cuộc gọi');
        }
      }, 800);
      setSocket(newSocket);
    }
  }, []);

  return <>{children}</>;
};

export default BasicLayout;
