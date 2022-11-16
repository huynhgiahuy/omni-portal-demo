import api from '@/api';
import request from '@/utils/request';

const token = window.localStorage.getItem('access_token');
export async function requestListUserRole(
  permission_code_list?: string[],
  role_code?: string,
  role_desc?: string,
) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/role_and_perm/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
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

export async function requestGroupPermissionData() {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/role/read`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {},
  });
}

export async function requestAddNewUser(
  full_name: string,
  email: string,
  phone: string,
  team: string,
  role: string,
) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/assign_user_role`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      full_name,
      email,
      phone,
      team,
      role,
    },
  });
}

export async function requestAllUserPermission(limit: number, offset: number) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/get_user_permission`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      limit,
      offset,
    },
  });
}

export async function requestDetailUserPermission(limit: number, offset: number, user_id: string) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/get_user_permission`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      limit,
      offset,
      user_id,
    },
  });
}

export async function requestDeleteUserPermission(user_id: string) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/delete_user_permission`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_id,
    },
  });
}
