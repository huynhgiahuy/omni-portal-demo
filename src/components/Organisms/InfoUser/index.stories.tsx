import { message } from 'antd';
import { useState } from 'react';

import { ComponentMeta, ComponentStory, Story } from '@storybook/react';

import InfoUser from './index';

export default {
  title: 'HappyConnect/Organisms/InfoUser',
  component: InfoUser,
  argTypes: {},
} as ComponentMeta<typeof InfoUser>;

const Template: ComponentStory<typeof InfoUser> = (args) => <InfoUser {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentUser: {
    name: 'Nguyễn Văn A',
    email: 'test@gmail.com',
    department: 'Vận hành',
    work_address: 'mb',
    title: 'cbgs',
    level: 'Level 1',
    home_address: 'Hà nội',
    phone_number: '0945555111',
    ip_phone: '112233',
    team: '1',
  },
  settings: {
    radio_theme: true,
    action_call: true,
  },
  notifications: {
    missed_call: false,
    incoming_call: true,
    critic_issue: true,
    night_plan: true,
    shift: true,
    overdue_message: true,
  },
  listTeamPermission: [
    { id: '1', name: 'test1' },
    { id: '2', name: 'test2' },
  ],
  avatar: 'https://picsum.photos/200/300',
  handleChangeNotifications: (values) => {
    message.success('Cập nhập thành công');
  },
  handleChangeSettings: (values) => {
    message.success('Cập nhập thành công');
  },
};
