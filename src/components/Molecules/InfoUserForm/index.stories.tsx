import { message } from 'antd';
import { useState } from 'react';

import { ComponentMeta, ComponentStory, Story } from '@storybook/react';

import InfoUserFrom from './index';

export default {
  title: 'HappyConnect/Molecules/InfoUserFrom',
  component: InfoUserFrom,
  argTypes: {},
} as ComponentMeta<typeof InfoUserFrom>;

const Template: ComponentStory<typeof InfoUserFrom> = (args) => (
  <div style={{ width: 700, margin: '0 auto' }}>
    <InfoUserFrom {...args} />
  </div>
);

export const EditForm: Story = () => {
  const [currentUser, setCurrentUser] = useState({
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
  });

  const [list, setList] = useState([
    { id: '1', name: 'test1' },
    { id: '2', name: 'test2' },
  ]);
  return (
    <div style={{ width: 700, margin: '0 auto' }}>
      <InfoUserFrom
        currentUser={currentUser}
        listTeamPermission={list}
        handleSaveInfoForm={(values, setIsDisableSave) => {
          setCurrentUser(values);
          message.success('Cập nhật team mới thành công!');
          setIsDisableSave(true);
        }}
        handleNewTeam={(value, form) => {
          const newList = [...list, { id: `${list.length + 1}`, name: value }];
          setList(newList);
          message.success('Cập nhật team mới thành công!');
          form.setFieldsValue({ newTeamValue: undefined });
        }}
        handleDeleteTeam={(value) => {
          const newList = [...list];
          const index = newList.findIndex(({ id }) => id === value);
          newList.splice(index, 1);
          message.success('Xoá thành công!');
          setList(newList);
        }}
      />
    </div>
  );
};
