import { Badge, Spin, Tabs } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React from 'react';
import classNames from 'classnames';
import type { NoticeIconTabProps } from './NoticeList';
import NoticeList from './NoticeList';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import NoticeBellIcon from '../../assets/NoticeIcon.svg';

const { TabPane } = Tabs;

export type NoticeIconProps = {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (item: API.NoticeIconItem, tabProps: NoticeIconTabProps) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
  emptyImage?: string;
  children?: React.ReactElement<NoticeIconTabProps>[];
};

const NoticeIcon: React.FC<NoticeIconProps> & {
  Tab: typeof NoticeList;
} = (props) => {
  const getNotificationBox = (): React.ReactNode => {
    const {
      children,
      loading,
      onClear,
      onTabChange,
      onItemClick,
      onViewMore,
      clearText,
      viewMoreText,
    } = props;
    if (!children) {
      return null;
    }
    const panes: React.ReactNode[] = [];
    React.Children.forEach(children, (child: React.ReactElement<NoticeIconTabProps>): void => {
      if (!child) {
        return;
      }
      const { list, title, count, tabKey, showClear, showViewMore } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const tabTitle: string = msgCount > 0 ? `${title} (${msgCount})` : title;
      panes.push(
        <TabPane tab={tabTitle} key={tabKey}>
          <NoticeList
            clearText={clearText}
            viewMoreText={viewMoreText}
            list={list}
            tabKey={tabKey}
            onClear={(): void => onClear && onClear(title, tabKey)}
            onClick={(item): void => onItemClick && onItemClick(item, child.props)}
            onViewMore={(event): void => onViewMore && onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
          />
        </TabPane>,
      );
    });
    return (
      <>
        <Spin spinning={loading} delay={300}>
          <Tabs className={styles.tabs} onChange={onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </>
    );
  };

  const { className, count } = props;

  const [visible, setVisible] = useMergedState<boolean>(false, {
    value: props.popupVisible,
    onChange: props.onPopupVisibleChange,
  });
  const noticeButtonClass = classNames(className, styles.noticeButton);
  const notificationBox = getNotificationBox();
  const trigger = (
    <span className={classNames(noticeButtonClass, { opened: visible })}>
      <Badge count={count} style={{ boxShadow: 'none' }}>
        <img src={NoticeBellIcon} alt="..." className={styles.icon} />
      </Badge>
    </span>
  );
  if (!notificationBox) {
    return trigger;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={notificationBox}
      overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
      overlayStyle={{ paddingTop: 10 }}
    >
      {trigger}
    </HeaderDropdown>
  );
};

NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
