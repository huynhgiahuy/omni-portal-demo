import { Space } from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import Diapad from './Diapad';
import NoticeIconView from '../NoticeIcon';
import WorkingStatus from './WorkingStatus';
import AgentModalRing from '../AgentModalRing';
import AgentModalAnswer from '../AgentModalAnswer';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [isModalOpenRing, setIsModalOpenRing] = useState(false);
  const [isModalOpenAnswer, setIsModalOpenAnswer] = useState(false);
  const [isFullScreenModal, setIsFullScreenModal] = useState(false);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const showModalRing = () => {
    setIsModalOpenRing(true);
  };

  const handleOkRing = () => {
    setIsModalOpenRing(false);
  };

  const handleCancelRing = () => {
    setIsModalOpenRing(false);
  };

  const showModalAnswer = () => {
    setIsModalOpenAnswer(true);
    setIsModalOpenRing(false);
  };

  const handleOkAnswer = () => {
    setIsModalOpenAnswer(false);
  };

  const handleCancelAnswer = () => {
    setIsModalOpenAnswer(false);
  };

  const handleFullScreenModal = () => {
    setIsFullScreenModal(!isFullScreenModal);
  };

  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        onSearch={(value) => {
          console.log('input', value);
        }}
      />
      <div style={{ display: 'flex' }}>
        <WorkingStatus />
      </div>
      <Diapad />
      <NoticeIconView />
      <Avatar />
      {/* <SelectLang className={styles.action} /> */}
      <a
        onClick={showModalRing}
        style={{
          position: 'absolute',
          left: 0,
          background: 'white',
          color: 'white',
          borderColor: 'white',
          bottom: 0,
        }}
      >
        Button
      </a>

      <AgentModalRing
        isModalOpen={isModalOpenRing}
        handleOk={handleOkRing}
        handleCancel={handleCancelRing}
        handleOpenAnswer={showModalAnswer}
        isFullScreenModal={isFullScreenModal}
        handleFullScreenModal={handleFullScreenModal}
      />

      <AgentModalAnswer
        isModalOpen={isModalOpenAnswer}
        handleOk={handleOkAnswer}
        handleCancel={handleCancelAnswer}
        isFullScreenModal={isFullScreenModal}
        handleFullScreenModal={handleFullScreenModal}
      />
    </Space>
  );
};
export default GlobalHeaderRight;
