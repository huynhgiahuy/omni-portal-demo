import api from '@/api';
import request from '@/utils/request';

const token = window.localStorage.getItem('access_token');

export type dataUserContactProps = {
  id?: string;
  full_name: string;
  phone_number: string;
  ip_phone: string;
  email: string;
  work_unit: string;
  note: string;
};

export async function requestGetUserContact() {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/get_user_contact`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function requestAddUserContact(data: dataUserContactProps) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/add_user_contact`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export async function requestUpdateUserContact(data: dataUserContactProps) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/update_user_contact`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}
