import { Button, Tabs, Input, message } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { history, useIntl, useModel } from 'umi';

import { getUrlSSO } from '@/services/auth';
import ProForm, { LoginForm, ProFormText } from '@ant-design/pro-form';

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

  const handleClick = async (values: any) => {
    const urlSSO = await getUrlSSO(values.username, values.password);
    if (urlSSO?.token == undefined) {
      message.error(urlSSO.toString())
      return;
    }
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
          onFinish={async (values) => {
            handleClick(values);
          }}
        >
          <Tabs>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
              })}
            />
          </Tabs>
          <ProFormText
            name="username"
            label={false}
            placeholder="Nhập username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập username"
              },
            ]} />
          <ProFormText.Password
            name="password"
            label={false}
            placeholder="Nhập mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu"
              },
            ]} />
          {/* <Button className={styles.loginBtn} onClick={handleClick}>
            Đăng nhập bằng SSO
          </Button> */}
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
