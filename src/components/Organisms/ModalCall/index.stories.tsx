import { ComponentMeta, ComponentStory } from '@storybook/react';

import ModalCall from './index';

export default {
  title: 'Organisms/ModalCall',
  component: ModalCall,
  argTypes: {
    type: {
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
  type: 'ring',
  callRedirect: 'inbound',
  customerInfo: {
    full_name: 'Nguyễn Thị Diệu Nhi',
    name_unit: 'NhiNTD',
    phone_number: '0908778291',
    email: 'test@gmail.com',
    work_unit: 'IDC',
    ip_phone: '1111',
  },
};

export const Answer = Template.bind({});
Answer.args = {
  open: true,
  type: 'answer',
  callRedirect: 'inbound',
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
  muteCall: true,
};
