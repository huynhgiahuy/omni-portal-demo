/**
 * request Network request tool
 * More detailed api Document : https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { get, set } from './local-storage';
import { requestRefreshToken } from '@/services/auth';
import api from '@/apiEndpoint';
import { errorCode } from '@/constants/error-code';
import { message } from 'antd';

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'Create or modify data successfully.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'Delete data successfully.',
  400: 'There was an error in the request, and the server did not create or modify the data.',
  401: 'The user does not have permission (token, user name, password error).',
  403: 'Users are authorized, but access is prohibited.',
  404: 'The request is for a record that does not exist, and the server does not operate.',
  406: 'The format of the request is not available.',
  410: 'The requested resource is permanently deleted and will no longer be available.',
  422: 'A validation error occurred while creating an object.',
  500: 'Server error, please check the server.',
  502: 'Gateway error.',
  503: 'Service unavailable, server temporarily overloaded or maintained.',
  504: 'Gateway timed out.',
};

/**
 * Exception handler
 */

const errorHandler = (error: any) => {
  const { response, data, request } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    if (!request.url.includes('/login')) {
      // notification.error({
      //   message: `Request error ${status}: ${url}`,
      //   description: errorText,
      // });
      console.error(`REQUEST ERROR ${status}: ${request.url} => ${errorText} => ${response}`);
    }
    // fetchRetry(request.url, request.options)
  }
  if (!response) {
    console.error('NETWORK NOT RESPONSE');
    // notification.error({
    //   description: 'Your network is abnormal, unable to connect to the server',
    //   message: 'Network abnormality',
    // });
  }

  return data;
};
/**
 * Configure the default parameters for request requests
 */

const request = extend({
  errorHandler,
  // timeout: 3 * 60000,
  // retries: 2,
  // headers: {
  //   Authorization: `Bearer ${
  //     localStorage.getItem('access_token') ? localStorage.getItem('access_token') : ''
  //   }`,
  // },
  // Default error handling
  // credentials: 'include', // Does the default request bring a cookie
});

const getTokenGatewayByRefreshToken = async (refreshToken: string) => {
  try {
    const res = await requestRefreshToken(refreshToken);

    if (res?.success) {
      set('rid', res.data[0].refresh_token);
      set('access_token', res.data[0].access_token);
      return res.data[0];
    } else window.location.href = `${api.UMI_API_URL}/user/login`;

    // if (res.status === 401 || res.status === 201 || !res.success) {
    //   // window.location = `${api.UMI_API_BASE_URL}/user/sso_login?redirect_uri=http%3A%2F%2F${api.UMI_DOMAIN}%3A${api.PORT}%2Fmainpage`;
    //   window.location = `${api.UMI_API_BASE_URL}/user/sso_fpt_logout?redirect_uri=${api.UMI_API_URL}`;
    // }
    throw new Error('ERROR~');
  } catch (err) {
    return null;
  }
};

// dispatch take from model settings
export function setUp(dispatch: any) {
  const { cancel } = request.CancelToken.source();
  request.interceptors.response.use(async (res: any, options: any) => {
    const response = await res.clone().json();
    const accessTokenExpired = response?.error_code === 401; //check token

    if (accessTokenExpired) {
      try {
        const rid = get('rid');
        if (!rid) {
          // window.location = `${api.UMI_API_BASE_URL}/user/sso_fpt_logout?redirect_uri=${api.UMI_API_URL}`;
          return res;
        }
        const tokens = await getTokenGatewayByRefreshToken(rid);
        if (tokens?.success === true) {
          window.localStorage.setItem('access_token', tokens?.data[0]?.access_token);
          window.localStorage.setItem('rid', tokens?.data[0]?.refresh_token);
          dispatch({
            type: 'user/save',
            payload: {
              tokenGateway: `Bearer ${tokens?.data[0]?.access_token}`,
              accessToken: tokens?.data[0]?.access_token,
            },
          });
          // retry with new access token

          return request(options.url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${tokens?.data[0]?.access_token}`,
            },
          });
        }
        throw new Error('Refresh token expired.');
      } catch (err) {
        // clear local storage
        // remove('rid');
        // remove('access_token');
        // remove('user_id');
        cancel('Session time out.');
      }
    } else return res;
  });

  // retrie request
  // request.interceptors.response.use(async (res, options) => {
  //   // detail see at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  //   const retryCodes = [408, 500, 502, 503, 504, 522, 524];
  //   if (retryCodes.includes(res.status) && options.retries > 0) {
  //     return request(options.url, {
  //       ...options,
  //       retries: options.retries - 1,
  //     });
  //   }
  //   return res;
  // });
  // error handling
  request.interceptors.response.use(async (res, options) => {
    const response = await res.clone().json();
    if (!response?.success && response?.error_code) {
      let msg = errorCode[response?.error_code].vie;
      if (response.error_code === 8000) {
        msg = msg?.replace('${field}', response?.error);
      }
      message.error(msg);
    }
    return res;
  });
}

// export default fetchRetry;
export default request;
