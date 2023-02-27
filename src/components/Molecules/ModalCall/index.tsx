import './index.less';

import { Modal, Space } from 'antd';
import clsx from 'clsx';
import React from 'react';

import { PhoneOutlined } from '@ant-design/icons';

import audio from '../../../../assets/iphone_12.mp3';
import Arrow from '../../../../public/arrow.svg';
import Share from '../../../../public/share.svg';

export interface ModalCallProps {
  type: 'ring' | 'answer';
  isFullScreenModal: boolean;
  isModalOpen: boolean;
}

const ModalCall: React.FC<ModalCallProps> = ({ type, isFullScreenModal, isModalOpen }) => {
  return (
    <div className="m-modal-call">
      <Modal
        className={clsx(
          'm-modal-call__modal',
          isFullScreenModal
            ? 'm-modal-call__modal--full-screen'
            : 'm-modal-call__modal--mini-screen',
        )}
        mask={false}
        closable={false}
        footer={false}
        open={isModalOpen}
        centered={isFullScreenModal}
        width={isFullScreenModal ? 772 : 373}
      >
        <div
          className={clsx(
            'm-modal-call__content',
            isFullScreenModal
              ? 'm-modal-call__content--full-screen'
              : 'm-modal-call__content--mini-screen',
          )}
        >
          <div className="flex">
            <div className="flex">
              <PhoneOutlined className="m-modal-call__icon-call" />
              <img src={Arrow} alt="arrow" style={{ position: 'absolute', left: 25, top: 8 }} />
            </div>
            <p style={{ color: 'white', paddingLeft: 20 }}>Cuộc gọi đến</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCall;
