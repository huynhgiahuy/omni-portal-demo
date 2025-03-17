import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useModel } from 'umi';

import { socketAtom } from '@/socketio';

const { UMI_API_BASE_URL } = process.env;

const BasicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const access_token = localStorage.getItem('access_token');
  const { initialState } = useModel('@@initialState');
  const [, setSocket] = useAtom(socketAtom);

  useEffect(() => {
    if (initialState?.currentUser?.id) {
      const newSocket = io(`${UMI_API_BASE_URL}`, {
        path: '/voip-service/ws/socket.io',
        transports: ['websocket'],
        query: {
          Authorization: access_token,
        },
      });

      // newSocket.emit('authen_event', { token: access_token });

      setSocket(newSocket);
    }
  }, []);

  return <>{children}</>;
};

export default BasicLayout;
