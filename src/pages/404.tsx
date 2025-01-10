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
    status={status ? status : '500'}
    title={title ? title : '500'}
    subTitle={subTitle ? subTitle : 'Đã xảy ra lỗi.'}
    extra={
      <Button type="primary" onClick={() => history.push('/omni-channel/search-page')}>
        Trang chủ
      </Button>
    }
  />
);

export default NoFoundPage;
