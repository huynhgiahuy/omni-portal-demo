import {
  Avatar,
  Col,
  Divider,
  Form,
  Image,
  Menu,
  Row,
  Switch,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, history, useModel } from 'umi';
import {
  CompassFilled,
  LogoutOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import IconDark from './Vector 132.png';

import type { MenuInfo } from 'rc-menu/lib/interface';
const { SubMenu } = Menu;

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('username');
  history.push('/user/login');
};

type valuesProps = {
  missed_call: boolean;
  incoming_call: boolean;
  critic_issue: boolean;
  night_plan: boolean;
  shift: boolean;
  overdue_message: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [values, setValues] = useState<valuesProps>({
    missed_call: initialState?.currentUser?.notification?.missed_call ? true : false,
    incoming_call: initialState?.currentUser?.notification?.incoming_call ? true : false,
    critic_issue: initialState?.currentUser?.notification?.critic_issue ? true : false,
    night_plan: initialState?.currentUser?.notification?.night_plan ? true : false,
    shift: initialState?.currentUser?.notification?.shift ? true : false,
    overdue_message: initialState?.currentUser?.notification?.overdue_message ? true : false,
  });

  const [valueSetting, setValueSetting] = useState({
    radio_theme: initialState?.currentUser?.screen_mode?.dark_mode ? true : false,
  });

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        loginOut();
        return;
      }
      if (key === 'user') {
        history.push('/omni-channel/search-page');
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

  useEffect(() => {
    setValues({
      missed_call: initialState?.currentUser?.notification?.missed_call ? true : false,
      incoming_call: initialState?.currentUser?.notification?.incoming_call ? true : false,
      critic_issue: initialState?.currentUser?.notification?.critic_issue ? true : false,
      night_plan: initialState?.currentUser?.notification?.night_plan ? true : false,
      shift: initialState?.currentUser?.notification?.shift ? true : false,
      overdue_message: initialState?.currentUser?.notification?.overdue_message ? true : false,
    });
    setValueSetting({
      radio_theme: initialState?.currentUser?.screen_mode?.dark_mode ? true : false,
    });
  }, [initialState?.currentUser]);

  async function onChangeSettings(e: boolean) {
    setValueSetting({ radio_theme: e });
  }

  const MenuItems = [
    {
      key: 'user',
      icon: (
        <>
          <Avatar size="small" style={{ backgroundColor: 'color' }}>
            <UserOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
          </Avatar>
          <span style={{ paddingLeft: '5px' }}>
            <FormattedMessage id="menu.account.avatar.person" />
          </span>
        </>
      )
    },
    {
      key: 'logout',
      icon: (
        <>
          <Avatar size="small" style={{ backgroundColor: 'color' }}>
            <LogoutOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
          </Avatar>
          <span style={{ paddingLeft: '5px' }}>
            <FormattedMessage id="menu.account.avatar.logout" />
          </span>
        </>
      )
    }
  ]

  const menuHeaderDropdown = (
    <Form
      form={form}
      onValuesChange={(e) => {
        const testValue = Object.assign(values, e);
        setValues(testValue);
      }}
    >
      <Menu className={styles.menu} items={MenuItems} onClick={onMenuClick}>
        {/* <Menu.Item key="user">
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
                <Switch
                  size="small"
                  checked={values.missed_call}
                //onChange={onChangeNotifications}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo cuộc gọi đến
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="incoming_call">
                <Switch
                  size="small"
                  checked={values.incoming_call}
                //onChange={onChangeNotifications}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo sự cố lớn
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="critical_issue">
                <Switch
                  size="small"
                  checked={values.critic_issue}
                //onChange={onChangeNotifications}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo gửi kế hoạch đêm
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="night_plan">
                <Switch
                  size="small"
                  checked={values.night_plan}
                //onChange={onChangeNotifications} 
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo bàn giao ca trực
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="shift">
                <Switch
                  size="small"
                  checked={values.shift}
                //onChange={onChangeNotifications} 
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.notifyMenu}>
            <Col span={20} className={styles.notifyMenuCol1}>
              Thông báo quá hạn tin nhắn
            </Col>
            <Col span={4} className={styles.notifyMenuSwitch}>
              <Form.Item className={styles.notifyMenuForm} name="overdue_message">
                <Switch
                  size="small"
                  checked={values.overdue_message}
                //onChange={onChangeNotifications}
                />
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
                <Col span={16}>
                  <FormattedMessage
                    id="menu.account.monitor.omni.dark"
                    defaultMessage="monitor setting"
                  />
                </Col>
                <Col span={4}>
                  <Form.Item noStyle name="radio_theme">
                    <Switch
                      size="small"
                      checked={valueSetting.radio_theme}
                      onChange={onChangeSettings}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <p className={styles.popupDisplayContent}>
              Điều chỉnh giao diện của phần mềm để giảm độ chói và cho đôi mắt được nghỉ ngơi.
            </p>
            <div className={styles.popupDisplayTitle}>
              <Row>
                <Col span={4}>
                  <Avatar size="small" style={{ backgroundColor: 'color' }}>
                    <CompassFilled
                      style={{ paddingRight: '13px', width: '10px', color: 'black' }}
                    />
                  </Avatar>
                </Col>
                <Col span={16}>
                  <FormattedMessage
                    id="menu.account.monitor.omni.zoom"
                    defaultMessage="monitor setting"
                  />
                </Col>
                <Col>
                  <Form.Item noStyle name="radio_theme">
                    <Switch size="small" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <p className={styles.popupDisplayContent}>
              Làm giảm kích thước phông chữ để có thêm nội dung vừa với màn hình.
            </p>
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
        </Menu.Item> */}
      </Menu>
    </Form>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size={32}
          className={styles.avatar}
          //src={`${api.UMI_API_BASE_URL}/user-service/api/user/get_user_avatar?file_name=${initialState?.currentUser?.avatar}`}
          alt="avatar"
          icon={
            <UserOutlined style={{ fontSize: 20, color: '#fff' }} />
          }
        />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
