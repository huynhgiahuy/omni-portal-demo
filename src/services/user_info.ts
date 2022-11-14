import api from '@/api';
import request from '@/utils/request';
import { requestProps } from './auth';

export const endpoint = api.UMI_API_BASE_URL;

export type UserInfoProps = {
  image: string;
  name: string;
  email: string;
  role: string;
  department: string;
  level: string;
  organization: string;
  home_address: string;
  work_address: string;
  password: string;
  latest_update_password: string;
  phone_number: string;
  ip_phone: string;
  equipment: string[];
  status: string;
  notification: {
    missed_call: boolean;
    incoming_call: boolean;
    critic_issue: boolean;
    night_plan: boolean;
    shift: boolean;
    overdue_message: boolean;
  };
  screen_mode: {
    dark_mode: boolean;
    simple_mode: boolean;
  };
  id: string;
};

export interface requeGetUserInfoProps extends requestProps {
  data: UserInfoProps;
}

export async function requestGetInfoUser(token?: any): Promise<requeGetUserInfoProps> {
  return request(
    `${endpoint}/user-service/api/settings/user/get_user_info?current_user=nghiahm4%40fpt.com.vn`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        token,
      },
    },
  );
}
