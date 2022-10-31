import React, { useCallback } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin, Dropdown } from 'antd';
import { history, useModel, FormattedMessage } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface';

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
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      if (key === 'user') {
        alert('Page user is not exist!');
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
  const menuHeaderDropdownUser = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="user">
        Trang thông tin cá nhân asdad asd asd asd asd asd asd ad sd ad{' '}
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  const menuHeaderDropdownNotify = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="notify">Thông báo cuộc gọi nhỡ</Menu.Item>
      <Menu.Item key="notify">Thông báo cuộc gọi đến</Menu.Item>
      <Menu.Item key="notify">Thông báo sự cố lớn</Menu.Item>
    </Menu>
  );

  const menuHeaderDropdownMonitor = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="displayAccessibility">Màn hình và trợ năng</Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
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
      <Dropdown overlay={menuHeaderDropdownUser} trigger={['click']}>
        <Menu.Item key="user">
          <Avatar size="small" style={{ backgroundColor: 'color' }}>
            <UserOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
          </Avatar>
          <span style={{ paddingLeft: '5px' }}>
            <FormattedMessage id="menu.account.avatar.person" />
          </span>
        </Menu.Item>
      </Dropdown>
      <Dropdown overlay={menuHeaderDropdownNotify} trigger={['click']}>
        <Menu.Item key="notify">
          <Avatar size="small" style={{ backgroundColor: 'color' }}>
            <NotificationOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
          </Avatar>
          <span style={{ paddingLeft: '5px' }}>
            <FormattedMessage id="menu.account.avatar.notify" />
          </span>
        </Menu.Item>
      </Dropdown>
      <Dropdown overlay={menuHeaderDropdownMonitor} trigger={['click']}>
        <Menu.Item key="displayAccessibility">
          <Avatar size="small" style={{ backgroundColor: 'color' }}>
            <SettingOutlined style={{ paddingLeft: '2px', width: '10px', color: 'black' }} />
          </Avatar>
          <span style={{ paddingLeft: '5px' }}>
            <FormattedMessage id="menu.account.avatar.displayAccessibility" />
          </span>
        </Menu.Item>
      </Dropdown>
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
