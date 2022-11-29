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

export async function requestCheckPhoneContact(phone_number: string) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/check_user_phone_number`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      phone_number,
    },
  });
}

export async function requestHistoryCallData(
  limit?: number,
  offset?: number,
  from_datetime?: string,
  to_datetime?: string,
  direction?: any,
  result?: any,
  search_name?: string,
) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/call/get_call_history`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      limit,
      offset,
      from_datetime,
      to_datetime,
      direction,
      result,
      search_name,
    },
  });
}

export async function requestUpdateNoteHistoryCall(call_id?: string, note?: string) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/call/update_call_note`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      call_id,
      note,
    },
  });
}
