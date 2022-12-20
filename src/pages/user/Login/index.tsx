import { LoginForm } from '@ant-design/pro-form';
import { Button, message, Tabs } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { history, useIntl, useModel } from 'umi';

import styles from './index.less';
import { getUrlSSO, requestGetInfoUser } from '@/services/auth';
import api from '../../../api';
const token = window.localStorage.getItem('access_token');
const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async (data: API.CurrentUser[]) => {
    await setInitialState((s) => ({
      ...s,
      currentUser: data[0],
      token: token,
    }));
  };

  useLayoutEffect(() => {
    if (token) {
      const requestInfoUser = async () => {
        setIsLogin(false);
        return token && (await requestGetInfoUser(token));
      };

      requestInfoUser()
        .then((res: any) => {
          if (res.success) {
            setIsLogin(false);
            fetchUserInfo(res.data);

            if (history.length > 2) {
              history.go(-1);
            } else {
              history.push('/');
            }
          } else {
            setIsLogin(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleSubmit = async (values: API.LoginParams) => {
    try {
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  const handleClickLogin = async () => {
    const urlSSO = await getUrlSSO(api.UMI_API_URL);
    if (urlSSO?.success) {
      window.location.href = urlSSO.data[0];
    }

    return null;
  };

  return (
    <div className={styles.container}>
      {isLogin && (
        <div className={styles.content}>
          <LoginForm
            logo={<img alt="logo" src="/logo.svg" />}
            title="Omni Channel"
            initialValues={{
              autoLogin: true,
            }}
            submitter={false}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                })}
              />
            </Tabs>

            {type === 'account' && (
              <>
                <Button className={styles.loginBtn} onClick={handleClickLogin}>
                  Đăng nhập bằng SSO
                </Button>
              </>
            )}
          </LoginForm>
        </div>
      )}
    </div>
  );
};

export default Login;
