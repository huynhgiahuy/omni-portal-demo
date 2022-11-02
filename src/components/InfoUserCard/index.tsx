import { Space, Image, Typography } from 'antd';
import React from 'react';
import Avatar from '../../../public/avatar_default.png';
import { changeNumberPhone } from '../RightContent/Diapad';

type InfoUserCardProps = {
  userName: string;
  numberPhone: string;
  handlePhone?: (e: string) => void;
  textSearch?: string;
};

const InfoUserCard: React.FC<InfoUserCardProps> = ({
  userName,
  numberPhone,
  handlePhone,
  textSearch,
}) => {
  return (
    <Space
      size={[18, 0]}
      align="center"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handlePhone && handlePhone(numberPhone);
      }}
    >
      <Image src={Avatar} width={30} height={30} preview={false} style={{ borderRadius: '100%' }} />
      <div>
        <Typography.Text style={{ fontSize: 13, fontWeight: 400, color: '#000000' }}>
          {userName}
        </Typography.Text>
        <br />
        <Typography.Text style={{ fontSize: 11, fontWeight: 400, color: '#959595' }}>
          {changeNumberPhone(numberPhone)}
        </Typography.Text>
      </div>
    </Space>
  );
};

export default InfoUserCard;
