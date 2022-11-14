import React, { useCallback } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  NotificationOutlined,
  CompassFilled,
} from '@ant-design/icons';
import { Avatar, Menu, Spin, Row, Col, Switch, Divider, Radio, Typography, Image } from 'antd';
import { history, useModel, FormattedMessage } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface';
import IconDark from './Vector 132.png';

const { SubMenu } = Menu;
const { Title } = Typography;

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('rid');
  history.push('/user/login');

  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      console.log('avatar_drop_down:>> ', event);
      if (key === 'logout') {
        setInitialState((s: any) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      if (key === 'user') {
        history.push(`/omni-channel/setting`);
        return;
      }
      if (key === 'notify') {
        alert('Page notify is not exist!');
      }
      if (key === 'displayAccessibility') {
        alert('Page display is not exist!');
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  function onChange(checked: any) {
    console.log(`switch to ${checked}`);
  }

  function handleLight() {
    setInitialState((s: any) => ({
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

  function handleDark() {
    setInitialState((s: any) => ({
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
  }
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

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} mode="inline" onClick={onMenuClick}>
      {/* {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />} */}
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
              <NotificationOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
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
            <Switch size="small" defaultChecked onChange={onChange} />
          </Col>
        </Row>
        <Row className={styles.notifyMenu}>
          <Col span={20} className={styles.notifyMenuCol1}>
            Thông báo cuộc gọi đến
          </Col>
          <Col span={4} className={styles.notifyMenuSwitch}>
            <Switch size="small" defaultChecked onChange={onChange} />
          </Col>
        </Row>
        <Row className={styles.notifyMenu}>
          <Col span={20} className={styles.notifyMenuCol1}>
            Thông báo sự cố lớn
          </Col>
          <Col span={4} className={styles.notifyMenuSwitch}>
            <Switch size="small" defaultChecked onChange={onChange} />
          </Col>
        </Row>
        <Row className={styles.notifyMenu}>
          <Col span={20} className={styles.notifyMenuCol1}>
            Thông báo gửi kế hoạch đêm
          </Col>
          <Col span={4} className={styles.notifyMenuSwitch}>
            <Switch size="small" defaultChecked onChange={onChange} />
          </Col>
        </Row>
        <Row className={styles.notifyMenu}>
          <Col span={20} className={styles.notifyMenuCol1}>
            Thông báo bàn giao ca trực
          </Col>
          <Col span={4} className={styles.notifyMenuSwitch}>
            <Switch size="small" defaultChecked onChange={onChange} />
          </Col>
        </Row>
        <Row className={styles.notifyMenu}>
          <Col span={20} className={styles.notifyMenuCol1}>
            Thông báo quá hạn tin nhắn
          </Col>
          <Col span={4} className={styles.notifyMenuSwitch}>
            <Switch size="small" defaultChecked onChange={onChange} />
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
                  {/* <SettingOutlined
                    style={{ paddingRight: '13px', width: '10px', color: 'black' }}
                  /> */}
                  {/* <Avatar style={{ verticalAlign: 'right' }} size={13} src={IconDark}></Avatar> */}
                  <Image preview={false} src={IconDark}></Image>
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
          <Radio.Group defaultValue={1}>
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
                <Radio className={styles.popupDisplayColRadio} value={1}></Radio>
              </Col>
            </Row>
            <Row onChange={handleDark}>
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
          <div className={styles.popupDisplayTitle}>
            <Row>
              <Col span={4}>
                <Avatar size="small" style={{ backgroundColor: 'color' }}>
                  <CompassFilled style={{ paddingRight: '13px', width: '10px', color: 'black' }} />
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
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        {/* <span className={`${styles.name} anticon`}>{currentUser.name}</span> */}
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
