import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { socketAtom } from '@/socketio';

function useSubWs<T>(topic: string, callback: (message: T) => void) {
  const [socket] = useAtom(socketAtom);

  useEffect(() => {
    if (!socket) return;
    socket.on(topic, callback);
    return () => {
      socket.off(topic, callback);
    };
  }, [socket, topic, callback]);
}

export default useSubWs;
