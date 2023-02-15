import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang bạn vừa tìm kiếm không tồn tại"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Trang chủ
        </Button>
      }
    />
  );
};

export default NoFoundPage;
