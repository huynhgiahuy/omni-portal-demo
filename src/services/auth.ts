import request from '@/utils/request';
import api from '../apiEndpoint/index';

export const endpoint = api.UMI_API_BASE_URL;

/**
 * request to login
 * @param {string} data.username
 * @param {string} data.password
 * @returns {Promise<object>}
 */

export interface requestProps {
  success: boolean;
  error_code: number;
  length_data: number;
  message_error: string;
}

export interface requeGetUrlSSOProps extends requestProps {
  username: string;
  email: string;
  token: string;
}

interface requestVerifySSO extends requestProps {
  data: Array<{
    token: string;
  }>;
}

export const getUrlSSO = (
  usernameValue: string,
  passwordValue: string,
): Promise<requeGetUrlSSOProps> => {
  return request(`${endpoint}/api/account/login`, {
    method: 'POST',
    data: {
      username: usernameValue,
      password: passwordValue,
    },
  });
};

export async function verifySSO(data: any): Promise<requestVerifySSO> {
  return request(`${endpoint}/api/account/login`, {
    method: 'POST',
    data,
  });
}

export async function requestGetInfoUser(): Promise<requeGetUrlSSOProps> {
  return request(`${endpoint}/api/account/login`, {
    method: 'POST',
    data: {
      username: 'Test1',
      password: 'Test1@15652889',
    },
  });
}

export async function requestLogin(data: any) {
  return request(`${endpoint}/api/auth/login`, {
    method: 'POST',
    data,
  });
}

export async function requestLogout() {
  return request(`${api.UMI_API_BASE_URL}/user/sso_fpt_logout`, {
    method: 'GET',
    params: {
      redirect_uri: `${api.UMI_API_URL}`,
    },
  });
}

export async function getPermissionByRoleId(accessToken: string, roleId: string) {
  return request(`${endpoint}/user/get_permission_by_role_id`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    data: {
      role_id: roleId,
    },
  });
}

export async function getRoleUser(headers: any) {
  return request(`${endpoint}/user/my_permission`, {
    method: 'POST',
    headers,
    data: {},
  });
}

/**
 *
 * @param {string} headers.Authorization
 * @returns {Promise<object>}
 */
export async function requestGetLicense(headers: any) {
  // return request(`${api.URL_LICENSE}/get-license`, {
  //   method: 'POST',
  //   headers,
  //   // data: {
  //   //   token: 'token_id',
  //   // },
  // });
  return {
    status: 'OK',
    payload: {
      // request_id: '287e5cf1-b226-8d36-f16a-b87f9492e4ef',
      // lease_id: '',
      // renewable: false,
      // lease_duration: 0,
      data: {
        data: {
          licenseObject: [
            'mainpage',
            'call_center',
            'call_center/extensions',
            'call_center/gateways',
            'call_center/diaplan',
            'call_center/destination',
            'call_center/outbound_routes',
            'call_center/inbound_routes',
            'call_center/dialplan_manager',
            'call_center/applications',
            'call_center/call_block',
            'call_center/queues',
            'call_center/call_recordings',
            'call_center/history_call',
            'call_center/forward',
            'call_center/ivr',
            'call_center/operator_panel',
            'call_center/recordings',
            'call_center/ring_groups',
            'call_center/time_conditions',
            'call_center/voice_mail',
            'call_center/status',
            'call_center/active_call_center',
            'call_center/active_call',
            'call_center/agent_status',
            'call_center/registrations',
            'call_center/sip_status',
            'call_center/advanced',
            'call_center/access_controls',
            'call_center/default_settings',
            'config',
            'config/voicebot',
            'config/campaign-management',
            'config/standardized',
            'campaign',
            'standardized',
            'config/campaign-report',
            'omni_inbound',
            'omni_inbound/config_livechat',
            'campaign-management',
            'chat',
            'administrator',
            'administrator/roles',
            'administrator/users',
            'report-billing',
          ],
          licenseModule: ['Usermanagement', 'CallCenterManagement', 'OmniChatInbound'],
        },
      },
      // wrap_info: null,
      // warnings: null,
      // auth: null,
    },
  };
  // return {
  //   status: 'OK',
  //   payload: {
  //     request_id: null,
  //     lease_id: null,
  //     renewable: null,
  //     lease_duration: null,
  //     data: null,
  //     wrap_info: null,
  //     warnings: null,
  //     auth: null,
  //   },
  // };
}

/**
 * Request to refresh token
 * @param {string} data.refreshToken
 * @returns {Promise<object>}
 */
export async function requestRefreshToken(refreshToken: string): Promise<any> {
  return request(`${endpoint}/auth-service/api/get_token_from_refresh_token`, {
    method: 'POST',
    data: {
      refresh_token: refreshToken,
      redirect_uri: api.UMI_API_URL,
    },
  });
}
