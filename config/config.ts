// https://umijs.org/config/
import { defineConfig } from 'umi';

import defaultSettings from './defaultSettings';
import routes from './routes';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  define: {
    'process.env.UMI_WS_CALL_CENTER_URL': process.env.UMI_WS_CALL_CENTER_URL,
    'process.env.UMI_API_BASE_URL': process.env.UMI_API_BASE_URL,
    'process.env.REACT_APP_WEBSOCKET_SSL': process.env.REACT_APP_WEBSOCKET_SSL,
    'process.env.UMI_API_URL': process.env.UMI_API_URL,
    'process.env.UMI_DOMAIN': process.env.UMI_DOMAIN,
    'process.env.PORT': process.env.PORT,
    'process.env.REDIRECT_URI_PROTOCOL': process.env.REDIRECT_URI_PROTOCOL,
    'process.env.REDIRECT_URI_DOMAIN': process.env.REDIRECT_URI_DOMAIN,
    'process.env.TENANT_NAME': process.env.TENANT_NAME,
    'process.env.CLIENT_ID': process.env.CLIENT_ID,
    'process.env.SECRET_ID': process.env.SECRET_ID,
    'process.env.SECRET_VALUE': process.env.SECRET_VALUE,
    'process.env.ENV': process.env.ENV,
  },
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  chainWebpack(memo) {
    memo.module
      .rule('media')
      .test(/\.(mp3|4)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'));
  },
});
