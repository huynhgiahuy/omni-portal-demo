import React, { useState } from 'react';
import io, { Socket } from 'socket.io-client';

const { UMI_API_BASE_URL } = process.env;

const omniChannel = `${UMI_API_BASE_URL}`;

export const wsContext = React.createContext<{ socketio: Socket; token: string | null }>({
  socketio: io(omniChannel, {
    path: '/voip-service/ws/socket.io',
    transports: ['websocket'],
    query: {
      Authorization: '',
    },
    autoConnect: false,
  }),
  token: '',
});
export function WebSocketConTextProvider({ children }: { children: React.ReactNode }) {
  const access_token = localStorage.getItem('access_token');
  const [socket] = useState<Socket>(
    io(omniChannel, {
      path: '/voip-service/ws/socket.io',
      transports: ['websocket'],
      query: {
        Authorization: access_token,
      },
      autoConnect: false,
    }),
  );

  const value = {
    socketio: socket,
    token: access_token,
  };

  return <wsContext.Provider value={value}>{children}</wsContext.Provider>;
}
export default WebSocketConTextProvider;
