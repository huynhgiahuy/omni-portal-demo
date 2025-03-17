import { Space } from 'antd';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

export type dataProps = {
  call_id: string;
  phone: string;
  direction: string;
  event: string;
  call_history: string;
  name: string;
  is_ip_phone: boolean;
  contact: {
    full_name: string;
    phone_number: string;
    work_unit: string;
    ip_phone: string;
  };
  contact_email: string;
  call_type: string;
  image: string;
};

const GlobalHeaderRight: React.FC = () => {
  const userName = window.localStorage.getItem('username');
  return (
    <Space>
      <Avatar />
      <div>{userName}</div>
    </Space>
  );
};
export default GlobalHeaderRight;
