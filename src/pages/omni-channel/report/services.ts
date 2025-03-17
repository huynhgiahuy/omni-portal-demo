import React from 'react';

import api from '@/apiEndpoint';
import request from '@/utils/request';

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

export async function requestGetUserContact(
  token: string,
  data?: { keyword?: string; unit?: string[] },
) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/get_user_contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export async function requestAddUserContact(token: string, data: dataUserContactProps) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/add_user_contact`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export async function requestUpdateUserContact(token: string, data: dataUserContactProps) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/update_user_contact`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export async function requestDeleteUserContact(token: string, contact_ids: React.Key[]) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/delete_user_contact`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      contact_ids,
    },
  });
}

export async function requestCheckPhoneContact(token: string, phone_number: string) {
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
  token?: any,
  limit?: number,
  offset?: number,
  from_datetime?: string,
  to_datetime?: string,
  direction?: any,
  result?: any,
  search_name?: string,
  sort_key?: any,
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
      sort_key,
    },
  });
}

export async function requestUpdateNoteHistoryCall(token?: any, call_id?: string, note?: string) {
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

export async function requestSendPinUser(
  token: string,
  data: {
    email_user: string;
    contacts_id: string;
    pin_user: boolean;
  },
) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/pin_contact_user`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export async function requestGetTakeCallNote(
  token: string,
  data?: { phone_number: string; call_direction: string },
) {
  return request(
    `${api.UMI_API_BASE_URL}/voip-service/api/call/take_call_note`,

    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    },
  );
}

export async function requestSaveCallNote(
  token: string,
  data?: {
    call_id: string;
    phone_number: string;
    call_direction: string;
    personnel: string;
    content: string;
  },
) {
  return request(
    `${api.UMI_API_BASE_URL}/voip-service/api/call/save_call_note`,

    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    },
  );
}

export async function requestGetTranferInfo(token: string, data?: {}) {
  return request(`${api.UMI_API_BASE_URL}/user-service/api/user/get_transfer_info`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export async function requestGetDetailCallNote(token: string, call_id: any) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/call/take_call_note`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      call_id,
    },
  });
}

export async function requestGetDetailTransferHistoryCall(token: string, call_id: any) {
  return request(`${api.UMI_API_BASE_URL}/voip-service/api/call/get_call_history_detail`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      call_id,
    },
  });
}
