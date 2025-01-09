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
      status="404"
      title="404"
      subTitle="Trang bạn vừa tìm kiếm không tồn tại"
      extra={
        <Button type="primary" onClick={() => history.push('/user/login')}>
          Trang chủ
        </Button>
      }
    />
  );
};

export default NoFoundPage;
