import { Button, Result } from 'antd';
import React, { useEffect } from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => {
  const userToken = window.localStorage.getItem("token");
  useEffect(() => {
    if (!userToken) {
      history.push("/user/login");
    }
  })
  return (
    <Result
      status="403"
      title="403"
      subTitle="Bạn không có quyền xem trang này"
      extra={
        <Button type="primary" onClick={() => history.push('/omni-channel/search-page')}>
          Trang chủ
        </Button>
      }
    />
  );
};

export default NoFoundPage;
