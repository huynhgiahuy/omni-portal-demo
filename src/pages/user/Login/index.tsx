import { Tabs, message } from 'antd';
import React, { useEffect } from 'react';
import { history, useModel } from 'umi';
import { getUrlSSO } from '@/services/auth';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
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

  useEffect(() => {
    if (userToken) {
      history.push("/omni-channel/search-page")
    }
  }, []);

  const handleClickLogin = async (values: any) => {
    const urlSSO = await getUrlSSO(values.username, values.password);
    if (urlSSO?.token == undefined) {
      message.error(urlSSO.toString())
      return;
    }
    window.localStorage.setItem('token', urlSSO?.token);
    window.localStorage.setItem('username', urlSSO?.username);
    await fetchUserInfo(urlSSO)
    message.success('Đăng nhập thành công!!!')
    history.push("/omni-channel/search-page")
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design Pro"
          onFinish={async (values) => {
            handleClickLogin(values);
          }}
          submitter={{
            searchConfig: {
              submitText: "Đăng nhập"
            }
          }}
        >
          <Tabs items={[{
            key: 'account',
            label: 'Đăng nhập hệ thống',
          }]}>
            <Tabs.TabPane key="account" />
          </Tabs>
          <ProFormText
            name="username"
            label={false}
            placeholder="Username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập username"
              },
            ]} />
          <ProFormText.Password
            name="password"
            label={false}
            placeholder="Password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu"
              },
            ]} />
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
