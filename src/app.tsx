import { history } from 'umi';
import RightContent from '@/components/RightContent';
import { SettingDrawer } from '@ant-design/pro-layout';
import defaultSettings from '../config/defaultSettings';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  token?: string | null;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  if (history.location.pathname !== loginPath) {
    return {
      settings: {
        ...defaultSettings,
      },
    };
  }
  return {
    settings: {
      ...defaultSettings,
    },
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,

    childrenRender: (children, props) => {
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/user/login') && (
            <SettingDrawer
              enableDarkTheme
              prefixCls="setting_theme"
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings: {
                    navTheme: initialState?.currentUser?.screen_mode?.dark_mode
                      ? 'realDark'
                      : 'light',
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
              }}
            />
          )}

        </>
      );
    },
    ...initialState?.settings,
  };
};
