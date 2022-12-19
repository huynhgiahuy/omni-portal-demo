import io from 'socket.io-client';

const access_token = localStorage.getItem('access_token');
const { UMI_API_BASE_URL } = process.env;

const omniChannel = `${UMI_API_BASE_URL}`;
export const socket = io(omniChannel, {
  path: '/voip-service/ws/socket.io',
  transports: ['websocket'],
  query: {
    Authorization: access_token,
  },
  reconnectionAttempts: 1,
});
