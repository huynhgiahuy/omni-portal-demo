import './index.less';

import { Avatar, message, Spin, Upload, UploadFile } from 'antd';
import React, { useState } from 'react';

import { endpoint } from '@/services/auth';
import { CameraFilled, UserOutlined } from '@ant-design/icons';

import type { RcFile, UploadProps } from 'antd/es/upload/interface';

interface UploadAvatarProps {
  avatar?: string;
  handleUploadAvatar: (info: UploadFile) => void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ avatar, handleUploadAvatar }) => {
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem('access_token');

  const props: UploadProps = {
    name: 'file',
    action: `${endpoint}/user-service/api/settings/user/upload_user_image`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    accept: '.jpeg,.jpg,.png',
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 < 2000;
    if (!isLt2M) {
      message.error('Ảnh cần nhỏ hơn 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };
  return (
    <>
      <div className="m-upload-avatar">
        {avatar ? (
          <Avatar
            className="m-upload-avatar__img"
            src={loading ? <Spin /> : <img loading="lazy" src={avatar} />}
          />
        ) : (
          <Avatar
            className="m-upload-avatar__img"
            icon={<UserOutlined style={{ fontSize: 100 }} />}
          />
        )}

        <Upload
          {...props}
          beforeUpload={beforeUpload}
          onChange={async ({ file }) => {
            if (file.status === 'uploading') {
              setLoading(true);
            } else {
              setLoading(false);
            }
            handleUploadAvatar(file);
          }}
          className="m-upload-avatar__img-hover"
          showUploadList={false}
        >
          <CameraFilled style={{ fontSize: 40, color: '#87c686' }} />
        </Upload>
      </div>
    </>
  );
};

export default UploadAvatar;
