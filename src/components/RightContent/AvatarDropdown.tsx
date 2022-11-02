import React, { useCallback } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin, Row, Col, Switch, Divider, Radio } from 'antd';
import { history, useModel, FormattedMessage } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface';

const { SubMenu } = Menu;

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
        setInitialState((s) => ({ ...s, currentUser: undefined }));
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
        <Divider style={{ backgroundColor: '#B4B4B4', marginTop: '10px', marginBottom: '1px' }} />
        <Row className={styles.notifyMenu}>
          <Col span={24} style={{ fontSize: '13px', color: '#1890FF', paddingLeft: '13px' }}>
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
        <Menu.ItemGroup
          title={
            <div>
              <Row>
                <Col span={4}>
                  <Avatar size="small" style={{ backgroundColor: 'color' }}>
                    <SettingOutlined
                      style={{ paddingRight: '13px', width: '10px', color: 'black' }}
                    />
                  </Avatar>
                </Col>
                <Col span={20} style={{ paddingLeft: '10px', color: '#000000' }}>
                  <FormattedMessage
                    id="menu.account.monitor.omni.dark"
                    defaultMessage="monitor setting"
                  />
                </Col>
              </Row>
            </div>
          }
        >
          <Radio.Group defaultValue={1}>
            <Menu.Item className={styles.monitorItem} key="setting:1">
              <p className={styles.textMonitor}>
                Điều chỉnh giao diện của <br /> phần mềm để giảm độ chói <br /> và cho đôi mắt được
                nghỉ ngơi.
              </p>
            </Menu.Item>
            <Menu.Item className={styles.monitorRadio} key="setting:2">
              <Row>
                <Col span={12}>Tắt</Col>
                <Col span={12}>
                  <Radio style={{ paddingLeft: '40px' }} value={1}>
                    {' '}
                  </Radio>
                </Col>
              </Row>
            </Menu.Item>
            <Menu.Item className={styles.monitorRadio} key="setting:3">
              <Row>
                <Col span={12}>Bật</Col>
                <Col span={12}>
                  <Radio style={{ paddingLeft: '40px' }} value={2}>
                    {' '}
                  </Radio>
                </Col>
              </Row>
            </Menu.Item>
          </Radio.Group>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          title={
            <div className={styles.infoAccount}>
              <Row>
                <Col span={4}>
                  <Avatar size="small" style={{ backgroundColor: 'color' }}>
                    <SettingOutlined
                      style={{ paddingRight: '13px', width: '10px', color: 'black' }}
                    />
                  </Avatar>
                </Col>
                <Col span={20} style={{ paddingLeft: '6px', color: '#000000' }}>
                  <FormattedMessage
                    id="menu.account.monitor.omni.zoom"
                    defaultMessage="monitor setting"
                  />
                </Col>
              </Row>
            </div>
          }
        >
          <Radio.Group defaultValue={1}>
            <Menu.Item className={styles.monitorItem} key="setting:4">
              <p className={styles.textMonitor}>
                Làm giảm kích thước phông <br /> chữ để có thêm nội dung <br /> vừa với màn hình.
              </p>
            </Menu.Item>
            <Menu.Item key="setting:5" className={styles.monitorRadio}>
              <Row>
                <Col span={12}>Tắt</Col>
                <Col span={12}>
                  <Radio style={{ paddingLeft: '40px' }} value={1}>
                    {' '}
                  </Radio>
                </Col>
              </Row>
            </Menu.Item>
            <Menu.Item key="setting:6" className={styles.monitorRadio}>
              <Row>
                <Col span={12}>Bật</Col>
                <Col span={12}>
                  <Radio style={{ paddingLeft: '40px' }} value={2}>
                    {' '}
                  </Radio>
                </Col>
              </Row>
            </Menu.Item>
          </Radio.Group>
        </Menu.ItemGroup>
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
