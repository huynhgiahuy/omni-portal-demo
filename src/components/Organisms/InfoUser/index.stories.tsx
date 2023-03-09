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
  listTeamPermission: [
    { id: '1', name: 'test1' },
    { id: '2', name: 'test2' },
  ],
};

// export const EditForm = Template.bind({});
// EditForm.args = {
//   editForm: true,
//   currentUser: {
//     name: 'Nguyễn Văn A',
//     email: 'test@gmail.com',
//     department: 'Vận hành',
//     work_address: 'mb',
//     title: 'cbgs',
//     level: 'Level 1',
//     home_address: 'Hà nội',
//     phone_number: '0945555111',
//     ip_phone: '112233',
//     team: '1',
//   },
//   listTeamPermission: [
//     { id: '1', name: 'test1' },
//     { id: '2', name: 'test2' },
//   ],
//   handleSaveForm: (values, setIsEditForm, setIsDisableSave) => {
//     console.log(values);
//     setIsEditForm(false);
//     setIsDisableSave(true);
//   },
//   handleNewTeam: () => { },
//   handleDeleteTeam:(value) =>{

//   },
// };

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
    <InfoUser
      editForm={true}
      currentUser={currentUser}
      listTeamPermission={list}
      handleSaveForm={(values, setIsEditForm, setIsDisableSave) => {
        setCurrentUser({
          name: values.name || '',
          email: values.email || '',
          department: values.department || '',
          work_address: values.work_address || '',
          title: values.title || '',
          level: values.level || '',
          home_address: values.home_address || '',
          phone_number: values.phone_number || '',
          ip_phone: values.ip_phone || '',
          team: values.team || '',
        });
        setIsEditForm(false);
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
      avatar="https://picsum.photos/200/300"
      handleUploadAvatar={(e) => {
        console.log(e);
      }}
    />
  );
};

export const NoData = Template.bind({});
NoData.args = {
  listTeamPermission: [
    { id: '1', name: 'test1' },
    { id: '2', name: 'test2' },
  ],
  handleUploadAvatar: (e) => {
    console.log(e);
  },
};
