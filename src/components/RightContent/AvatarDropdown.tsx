import {
    Avatar, Col, Divider, Form, Image, Menu, message, Radio, Row, Spin, Switch, Typography
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, history, useModel } from 'umi';

import api from '@/api';
import { outLogin } from '@/services/ant-design-pro/api';
import {
    requeGetUserInfoProps, requestUpdatenotification, requestUpdateScreenMode
} from '@/services/user_info';
import {
    CompassFilled, LogoutOutlined, NotificationOutlined, SettingOutlined, UserOutlined
} from '@ant-design/icons';

import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import IconDark from './Vector 132.png';

import type { MenuInfo } from 'rc-menu/lib/interface';
const { SubMenu } = Menu;
const { Title } = Typography;

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  const logoutRequest = await outLogin();

  if (logoutRequest.success) {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('rid');
    window.location.href = logoutRequest.data[0];
  } else {
    message.error('Không thể đăng xuất vui lòng thử lại');
  }
};

type valuesProps = {
  radio_theme: boolean;
  missed_call: boolean;
  incoming_call: boolean;
  critical_issue: boolean;
  night_plan: boolean;
  shift: boolean;
  overdue_message: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [values, setValues] = useState<valuesProps>({
    radio_theme: initialState?.currentUser?.screen_mode?.dark_mode ? true : false,
    missed_call: initialState?.currentUser?.notification?.missed_call ? true : false,
    incoming_call: initialState?.currentUser?.notification?.incoming_call ? true : false,
    critical_issue: initialState?.currentUser?.notification?.critical_issue ? true : false,
    night_plan: initialState?.currentUser?.notification?.night_plan ? true : false,
    shift: initialState?.currentUser?.notification?.shift ? true : false,
    overdue_message: initialState?.currentUser?.notification?.overdue_message ? true : false,
  });
  const token = window.localStorage.getItem('access_token');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      // console.log('avatar_drop_down:>> ', event);
      if (key === 'logout') {
        loginOut();
        return;
      }
      if (key === 'user') {
        history.push(`/omni-channel/profile`);
        return;
      }
      if (key === 'notify') {
        alert('Page notify is not exist!');
      }
      if (key === 'displayAccessibility') {
        alert('Page display is not exist!');
      }
    },
    [setInitialState],
  );

  async function onChange() {
    const {
      critical_issue: critic_issue,
      incoming_call,
      missed_call,
      night_plan,
      overdue_message,
      shift,
    } = values;
    const data = { missed_call, incoming_call, critic_issue, night_plan, shift, overdue_message };
    const res = await requestUpdatenotification(data, token ? token : '');
    if (res.success) {
      await setInitialState((s) => ({
        ...s,
        currentUser: { ...initialState?.currentUser, notification: res.data[0] },
      }));
    } else {
      message.error('Cập nhập trạng thái không thành công, vui lòng thử lại');
      return;
    }
  }

  useEffect(() => {
    if (
      values.radio_theme !== initialState?.currentUser?.screen_mode?.dark_mode &&
      initialState?.currentUser?.screen_mode?.dark_mode !== undefined
    ) {
      const res = requestUpdateScreenMode(values.radio_theme, token ? token : '');

      res
        .then(async (result: requeGetUserInfoProps) => {
          if (result.success) {
            await setInitialState((s) => ({
              ...s,
              currentUser: {
                ...initialState.currentUser,
                setting: {
                  ...initialState.settings,
                  dark_mode: result.data[0].dark_mode,
                  simple_mode: result.data[0].simple_mode,
                },
              },
            }));
          } else {
            return;
          }
        })
        .catch((error) => {
          message.error('Chuyển giao diện lỗi vui lòng thử lại');
          return;
        });
    }
  }, [values.radio_theme]);

  function handleLight() {
    setInitialState((s) => ({
      ...s,
      settings: {
        navTheme: 'light',
        primaryColor: '#1890ff',
        layout: 'side',
        contentWidth: 'Fluid',
        fixedHeader: true,
        fixSiderbar: true,
        pwa: false,
        logo: '/logo_theme.svg',
        headerHeight: 48,
        splitMenus: false,
      },
    }));
  }

  const handleDark = async () => {
    await setInitialState((s: any) => ({
      ...s,
      settings: {
        navTheme: 'realDark',
        primaryColor: '#1890ff',
        layout: 'side',
        contentWidth: 'Fluid',
        fixedHeader: true,
        fixSiderbar: true,
        pwa: false,
        logo: '/logo_theme.svg',
        headerHeight: 48,
        splitMenus: false,
      },
    }));
  };

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState?.currentUser) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Form
      onValuesChange={(e) => {
        const testValue = Object.assign(values, e);
        setValues(testValue);
      }}
    >
      <Menu className={styles.menu} selectedKeys={[]} mode="inline" onClick={onMenuClick}>
        <Menu.Item key="user">
          <Avatar size="small" style={{ backgroundColor: 'color' }}>
            <UserOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
          </Avatar>
          <span style={{ paddingLeft: '5px' }}>
            <FormattedMessage id="menu.account.avatar.person" />
          </span>
        </Menu.Item>
        <SubMenu
          key="notify"
          title={
            <>
              <Avatar size="small" style={{ backgroundColor: 'color' }}>
                <NotificationOutlined
                  style={{ paddingLeft: '2px', width: '10px', color: 'black' }}
                />
              </Avatar>
              <span style={{ paddingLeft: '5px' }}>
                <FormattedMessage id="menu.account.avatar.notify" />
              </span>
            </>
          }
        >
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo cuộc gọi nhỡ
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="missed_call">
                <Switch size="small" defaultChecked={values.missed_call} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo cuộc gọi đến
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="incoming_call">
                <Switch size="small" defaultChecked={values.incoming_call} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo sự cố lớn
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="critical_issue">
                <Switch size="small" defaultChecked={values.critical_issue} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo gửi kế hoạch đêm
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="night_plan">
                <Switch size="small" defaultChecked={values.night_plan} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo bàn giao ca trực
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="shift">
                <Switch size="small" defaultChecked={values.shift} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo quá hạn tin nhắn
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="overdue_message">
                <Switch size="small" defaultChecked={values.overdue_message} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Divider
            style={{
              backgroundColor: '#B4B4B4',
              marginTop: '10px',
              marginBottom: '1px',
            }}
          />
          <Row className={styles.notifyMenu}>
            <Col
              span={24}
              style={{
                fontSize: '13px',
                color: '#1890FF',
                paddingLeft: '13px',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                paddingTop: '5px',
              }}
            >
              Xem tất cả cài đặt
            </Col>
          </Row>
        </SubMenu>
        <SubMenu
          key="displayAccessibility"
          title={
            <>
              <Avatar size="small" style={{ backgroundColor: 'color' }}>
                <SettingOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
              </Avatar>
              <span style={{ paddingLeft: '5px' }}>
                <FormattedMessage id="menu.account.avatar.displayAccessibility" />
              </span>
            </>
          }
        >
          <div className={styles.popupDisplay}>
            <div className={styles.popupDisplayTitle}>
              <Row>
                <Col span={4}>
                  <Avatar size="small" style={{ backgroundColor: 'color' }}>
                    <Image preview={false} src={IconDark} />
                  </Avatar>
                </Col>
                <Col span={20}>
                  <FormattedMessage
                    id="menu.account.monitor.omni.dark"
                    defaultMessage="monitor setting"
                  />
                </Col>
              </Row>
            </div>
            <Form.Item name="radio_theme">
              <Radio.Group
                defaultValue={
                  initialState?.currentUser?.screen_mode?.dark_mode
                    ? initialState?.currentUser?.screen_mode?.dark_mode
                    : false
                }
              >
                <p className={styles.popupDisplayContent}>
                  Điều chỉnh giao diện của phần mềm để giảm độ chói và cho đôi mắt được nghỉ ngơi.
                </p>
                <Row onChange={handleLight}>
                  <Col span={16}>
                    <Title level={5} className={styles.popupDisplayColTitle}>
                      Tắt
                    </Title>
                  </Col>
                  <Col span={8}>
                    <Radio className={styles.popupDisplayColRadio} value={false}></Radio>
                  </Col>
                </Row>
                <Row onChange={handleDark}>
                  <Col span={16}>
                    <Title level={5} className={styles.popupDisplayColTitle}>
                      Bật
                    </Title>
                  </Col>
                  <Col span={8}>
                    <Radio className={styles.popupDisplayColRadio} value={true}></Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            <div className={styles.popupDisplayTitle}>
              <Row>
                <Col span={4}>
                  <Avatar size="small" style={{ backgroundColor: 'color' }}>
                    <CompassFilled
                      style={{ paddingRight: '13px', width: '10px', color: 'black' }}
                    />
                  </Avatar>
                </Col>
                <Col span={20}>
                  <FormattedMessage
                    id="menu.account.monitor.omni.zoom"
                    defaultMessage="monitor setting"
                  />
                </Col>
              </Row>
            </div>
            <Radio.Group defaultValue={1}>
              <p className={styles.popupDisplayContent}>
                Làm giảm kích thước phông chữ để có thêm nội dung vừa với màn hình.
              </p>
              <Row>
                <Col span={16}>
                  <Title level={5} className={styles.popupDisplayColTitle}>
                    Tắt
                  </Title>
                </Col>
                <Col span={8}>
                  <Radio className={styles.popupDisplayColRadio} value={1}></Radio>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <Title level={5} className={styles.popupDisplayColTitle}>
                    Bật
                  </Title>
                </Col>
                <Col span={8}>
                  <Radio className={styles.popupDisplayColRadio} value={2}></Radio>
                </Col>
              </Row>
            </Radio.Group>
          </div>
        </SubMenu>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Avatar size="small" style={{ backgroundColor: 'color' }}>
            <LogoutOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
          </Avatar>
          <span style={{ paddingLeft: '5px' }}>
            <FormattedMessage id="menu.account.avatar.logout" />
          </span>
        </Menu.Item>
      </Menu>
    </Form>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={`${api.UMI_API_BASE_URL}/user-service/api/user/get_user_avatar?file_name=${initialState?.currentUser?.avatar}`}
          alt="avatar"
          icon={
            !initialState?.currentUser?.avatar && (
              <UserOutlined style={{ fontSize: 20, color: 'gray' }} />
            )
          }
        />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
