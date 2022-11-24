import api from '@/api';
import request from '@/utils/request';

const token = window.localStorage.getItem('access_token');

export type dataUserContactProps = {
  id?: string;
  contacts_id?: string;
  full_name: string;
  phone_number: string;
  ip_phone: string;
  email: string;
  work_unit: string;
  note: string;
  pin_user: boolean;
  external_customers: boolean;
  team: string;
};

export async function requestGetUserContact(data?: { keyword?: string; unit?: string[] }) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/get_user_contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
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

export async function requestDeleteUserContact(contacts_id: string) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/delete_user_contact`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      contacts_id,
    },
  });
}
