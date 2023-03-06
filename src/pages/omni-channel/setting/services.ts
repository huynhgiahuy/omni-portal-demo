import { FormProps } from 'antd';

import api from '@/api';
import request from '@/utils/request';

const token = window.localStorage.getItem('access_token');
export async function requestCreateRoleAndPerm(
  token: string,
  permission_code_list?: string[],
  role_code?: string,
  role_desc?: string,
) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/create_role_and_perm`, {
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

export async function requestUpdateRole(
  token: string,
  permission_code_list?: string[],
  role_code?: string,
  role_desc?: string,
  role_id?: string,
) {
  return request(
    `${api.UMI_API_BASE_URL}/user-service/api/authorization/update_role_and_permission`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        permission_code_list,
        role_code,
        role_desc,
        role_id,
      },
    },
  );
}

export async function requestEditUserInfo(data: FormProps) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/settings/user/update_user_infomation`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
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

export async function requestEditUser(
  full_name: string,
  email: string,
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
      team,
      role,
    },
  });
}

export async function requestAllUserPermission(limit: number, offset: number) {
  return request(
    `${api.UMI_API_BASE_URL}/user-service/api/settings/user/get_user_permission_info_data`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        limit,
        offset,
      },
    },
  );
}

export async function requestDetailUserPermission(limit: number, offset: number, user_id: string) {
  return request(
    `${api.UMI_API_BASE_URL}/user-service/api/settings/user/get_user_permission_info_data`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        limit,
        offset,
        user_id,
      },
    },
  );
}

export async function requestDeleteUserPermission(user_ids: React.Key[]) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/settings/delete_user_and_role`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_ids,
    },
  });
}

export async function requestReadRoleAndPerm(
  token: string,
  data?: {
    keyword?: string;
    sort_key?: { create_at?: number; updated_at?: number };
    role_code?: string;
    permission_code?: string;
    limit?: number;
    offset?: number;
  },
) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/authorization/read_role_and_perm`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export async function requestTeamPermissionData() {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/team/read_team`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {},
  });
}

export async function requestDeleteTeamPermission(team_id: string) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/team/delete_team`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      team_id,
    },
  });
}

export async function requestAllUserInfo(limit: number, offset: number) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/settings/read_user_and_role`, {
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
export async function requestDeleteRoleAndPermission(token: string, role_ids: React.Key[]) {
  return request(
    `${api.UMI_API_BASE_URL}/user-service/api/authorization/delete_role_and_permission`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        role_ids,
      },
    },
  );
}

export async function requestAllUserInfoFinal(
  limit?: number,
  offset?: number,
  keyword?: string,
  sort_key?: any,
  team_name?: any,
  work_address?: any,
  role_code?: any,
  status?: any,
) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/settings/read_user_and_role`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      limit,
      offset,
      keyword,
      sort_key,
      team_name,
      work_address,
      role_code,
      status,
    },
  });
}

export async function requestDetailUserInfoFinal(user_id?: string) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/settings/read_user_and_role`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_id,
    },
  });
}

export async function requestCreateNewTeam(name?: string) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/team/create_team`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
    },
  });
}

export async function requestUpdateUserInfoFinal(
  user_id: string,
  team_id: string,
  role_id: string,
  title: string,
  phone_number: string,
  ip_phone: string,
  level: string,
  work_address: string,
) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/settings/update_user_and_role`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_id,
      team_id,
      role_id,
      title,
      phone_number,
      ip_phone,
      level,
      work_address,
    },
  });
}
