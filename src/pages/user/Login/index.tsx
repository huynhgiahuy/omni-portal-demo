import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { Alert, Button, message, Tabs } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { FormattedMessage, history, useIntl, useModel } from 'umi';

import styles from './index.less';
import { getUrlSSO, requestGetInfoUser } from '@/services/auth';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { query } = history.location;
  const { redirect } = query as { redirect: string };
  const intl = useIntl();

  const fetchUserInfo = async (data?: any) => {
    const userInfo = {
      access: 'admin',
      address: '西湖区工专路 77 号',
      avatar: 'https://iili.io/mnXB2e.png',
      country: 'China',
      email: data ? data[1] : 'antdesign@alipay.com',
      geographic: {
        province: { label: '浙江省', key: '330000' },
        city: { label: '杭州市', key: '330100' },
      },
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      name: data ? data[0] : 'Lâm Mỹ Huyền',
      notifyCount: 12,
      phone: '0752-268888888',
      signature: '海纳百川，有容乃大',
      tags: [
        { key: '0', label: '很有想法的' },
        { key: '1', label: '专注设计' },
        { key: '2', label: '辣~' },
      ],
      title: '交互专家',
      unreadCount: 11,
      userid: '00000001',
    };

    await setInitialState((s) => ({
      ...s,
      currentUser: userInfo,
    }));
  };

  useLayoutEffect(() => {
    if (window.localStorage.getItem('access_token')) {
      const tokent = window.localStorage.getItem('access_token');
      const requestInfoUser = async () => {
        setIsLogin(false);
        return await requestGetInfoUser(tokent);
      };

      requestInfoUser()
        .then((res) => {
          if (res.success) {
            setIsLogin(false);
            fetchUserInfo(res.data);
            const defaultLoginSuccessMessage = intl.formatMessage({
              id: 'pages.login.success',
              defaultMessage: 'Đăng nhập thành công',
            });
            message.success(defaultLoginSuccessMessage);
            history.push(redirect || '/');
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
      // 登录
      // const msg = await login({ ...values, type });
      // console.log(msg);
      // if (msg.status === 'ok') {
      //   const defaultLoginSuccessMessage = intl.formatMessage({
      //     id: 'pages.login.success',
      //     defaultMessage: 'Đăng nhập thành công',
      //   });
      //   message.success(defaultLoginSuccessMessage);
      //   await fetchUserInfo();
      //   /** 此方法会跳转到 redirect 参数所在的位置 */
      //   if (!history) return;
      //   const { query } = history.location;
      //   const { redirect } = query as { redirect: string };
      //   history.push(redirect || '/');
      //   return;
      // }
      if (values.username === 'admin' && values.password === 'admin') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Đăng nhập thành công',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        setUserLoginState({ currentAuthority: 'admin', status: 'ok', type: 'account' });
      } else {
        message.error('Mật khẩu hoặc tài khoản không đúng vui lòng thử lại');
      }

      // console.log(msg);

      // 如果失败去设置用户错误信息

      // setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  const handleClickLogin = async () => {
    const urlSSO = await getUrlSSO();
    console.log(urlSSO);
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
            // subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
            initialValues={{
              autoLogin: true,
            }}
            // actions={[
            // <FormattedMessage
            //   key="loginWith"
            //   id="pages.login.loginWith"
            //   defaultMessage="其他登录方式"
            // />,
            // <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
            // <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
            // <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
            // ]}
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
              {/* <Tabs.TabPane
              key="mobile"
              tab={intl.formatMessage({
                id: 'pages.login.phoneLogin.tab',
                defaultMessage: '手机号登录',
              })}
            /> */}
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误(admin/ant.design)',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '用户名: admin or user',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码: ant.design',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="mobile"
                  placeholder={intl.formatMessage({
                    id: 'pages.login.phoneNumber.placeholder',
                    defaultMessage: '手机号',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.required"
                          defaultMessage="请输入手机号！"
                        />
                      ),
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.invalid"
                          defaultMessage="手机号格式错误！"
                        />
                      ),
                    },
                  ]}
                />

                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.captcha.placeholder',
                    defaultMessage: '请输入验证码',
                  })}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${intl.formatMessage({
                        id: 'pages.getCaptchaSecondText',
                        defaultMessage: '获取验证码',
                      })}`;
                    }
                    return intl.formatMessage({
                      id: 'pages.login.phoneLogin.getVerificationCode',
                      defaultMessage: '获取验证码',
                    });
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.captcha.required"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ]}
                  onGetCaptcha={async (phone) => {
                    const result = await getFakeCaptcha({
                      phone,
                    });
                    if (result === false) {
                      return;
                    }
                    message.success('获取验证码成功！验证码为：1234');
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
              <Button className={styles.loginBtn} onClick={handleClickLogin}>
                Đăng nhập bằng SSO
              </Button>
            </div>
          </LoginForm>
        </div>
      )}
    </div>
  );
};

export default Login;
