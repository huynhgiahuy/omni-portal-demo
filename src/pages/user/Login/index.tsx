import { Button, Tabs } from 'antd';
import React, { useLayoutEffect, } from 'react';
import { history, useIntl, useModel } from 'umi';

import { getUrlSSO } from '@/services/auth';
import { LoginForm } from '@ant-design/pro-form';

import styles from './index.less';

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const userToken = window.localStorage.getItem('token');
  const fetchUserInfo = async (data: any) => {
    await setInitialState((s) => ({
      ...s,
      currentUser: data,
      token: userToken,
    }));
  };

  const intl = useIntl();

  useLayoutEffect(() => {
    if (userToken) {
      history.push("/omni-channel/search-page")
    }
  }, []);

  const handleClickLogin = async () => {
    const urlSSO = await getUrlSSO();
    window.localStorage.setItem('token', urlSSO?.token);
    await fetchUserInfo(urlSSO)
    history.push("/omni-channel/search-page")
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design Pro"
          submitter={false}
        >
          <Tabs>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
              })}
            />
          </Tabs>
          <Button className={styles.loginBtn} onClick={handleClickLogin}>
            Đăng nhập bằng SSO
          </Button>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
