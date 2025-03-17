import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import React from 'react';
import { history } from 'umi';

type NoFoundPageProps = {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
};

const NoFoundPage: React.FC<NoFoundPageProps> = ({ status, title, subTitle }) => (
  <Result
    status='404'
    title='404'
    subTitle={subTitle ? subTitle : 'Trang bạn vừa tìm kiếm không tồn tại!'}
    extra={
      <Button type="primary" onClick={() => history.push('/omni-channel/search-page')}>
        Trang chủ
      </Button>
    }
  />
);

export default NoFoundPage;
