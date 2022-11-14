import api from '@/api';
import request from '@/utils/request';

const token = window.localStorage.getItem('access_token');
export async function requestListUserRole(
  offset: number,
  limit: number,
  permission_code_list?: string[],
  role_code?: string,
  role_desc?: string,
) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/permission/read`, {
    method: 'POST',
    data: {
      offset,
      limit,
      permission_code_list,
      role_code,
      role_desc,
    },
  });
}

export async function requestListUserInfo() {
  return request(
    `${api.UMI_API_BASE_URL}/user-service/api/settings/user/get_user_info?current_user=nghiahm4%40fpt.com.vn`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function requestEditUserInfo(
  name: string,
  role: string,
  department: string,
  level: string,
  organization: string,
  home_address: string,
  work_address: string,
  phone_number: string,
  ip_phone: string,
) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/settings/user/update_user_infomation`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
      role,
      department,
      level,
      organization,
      home_address,
      work_address,
      phone_number,
      ip_phone,
    },
  });
}
