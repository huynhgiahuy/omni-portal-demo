import { message } from 'antd';
import { useState } from 'react';

import { ComponentMeta, ComponentStory, Story } from '@storybook/react';

import ModalCall, { CallTypeProps } from './index';

export default {
  title: 'HappyConnect/Organisms/ModalCall',
  component: ModalCall,
  argTypes: {
    callType: {
      options: ['ring', 'answer'],
      control: { type: 'radio' },
    },
    callRedirect: { options: ['inbound', 'outbound', 'local'], control: { type: 'select' } },
  },
} as ComponentMeta<typeof ModalCall>;

const Template: ComponentStory<typeof ModalCall> = (args) => <ModalCall {...args} />;

export const RingCall = Template.bind({});
RingCall.args = {
  open: true,
  callType: 'ring',
  callRedirect: 'inbound',
  avatar: 'https://picsum.photos/200/300',
  customerInfo: {
    full_name: 'Nguyễn Thị Diệu Nhi',
    name_unit: 'NhiNTD',
    phone_number: '0908778291',
    email: 'test@gmail.com',
    work_unit: 'IDC',
    ip_phone: '1111',
  },
  handleUserTransfer: (e) => {
    message.info(`User transfer ${e}`);
  },
  onClickChangeCall: (e) => {
    message.info(`User click ${e}`);
  },
  handleReveiveCall: () => {
    message.info('reveive call');
  },
  handleHangUpCall: () => {
    message.info('hang up call');
  },
};

export const Answer = Template.bind({});
Answer.args = {
  open: true,
  callType: 'answer',
  callRedirect: 'inbound',
  avatar: 'https://picsum.photos/200/300',
  notes: [
    {
      personnel: 'Test1',
      call_direction: 'inbound',
      content: 'cuộc gọi đến',
      create_at: 1677730815,
    },
    {
      personnel: 'Test2',
      call_direction: 'outbound',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
    {
      personnel: 'Test3',
      call_direction: 'local',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
    {
      personnel: 'Test1',
      call_direction: 'inbound',
      content: 'cuộc gọi đến',
      create_at: 1677730815,
    },
    {
      personnel: 'Test2',
      call_direction: 'outbound',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
    {
      personnel: 'Test3',
      call_direction: 'local',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
    {
      personnel: 'Test1',
      call_direction: 'inbound',
      content: 'cuộc gọi đến',
      create_at: 1677730815,
    },
    {
      personnel: 'Test2',
      call_direction: 'outbound',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
    {
      personnel: 'Test3',
      call_direction: 'local',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
  ],
};

export const Demo: Story = () => {
  const customerInfo = {
    full_name: 'Nguyễn Thị Diệu Nhi',
    name_unit: 'NhiNTD',
    phone_number: '0908778291',
    email: 'test@gmail.com',
    work_unit: 'IDC',
    ip_phone: '1111',
  };
  const [open, setOpen] = useState(true);
  const [callType, setCallType] = useState<CallTypeProps>('ring');
  return (
    <ModalCall
      open={open}
      callType={callType}
      callRedirect={'inbound'}
      customerInfo={customerInfo}
      avatar="https://picsum.photos/200/300"
      notes={[]}
      listTransfer={[]}
      handleReveiveCall={() => {
        setCallType('answer');
      }}
      handleHangUpCall={() => {
        setOpen(false);
      }}
    />
  );
};
