import { message } from 'antd';
import { useState } from 'react';

import { ComponentMeta, ComponentStory, Story } from '@storybook/react';

import SelectItem from './index';

export default {
  title: 'HappyConnect/Atom/SelectItem',
  component: SelectItem,
  argTypes: {},
} as ComponentMeta<typeof SelectItem>;

const Template: ComponentStory<typeof SelectItem> = (args) => {
  return <SelectItem {...args} />;
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  value: '1',
  listTeamPermission: [
    { id: '1', name: 'test1' },
    { id: '2', name: 'test2' },
  ],
  handleNewTeam: (value) => {
    message.info(value);
  },
  handleDeleteTeam: (value) => {
    message.info(value);
  },
};

export const Success: Story = () => {
  const [list, setList] = useState([
    { id: '1', name: 'test1' },
    { id: '2', name: 'test2' },
  ]);
  return (
    <SelectItem
      listTeamPermission={list}
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
  );
};

export const Error: Story = () => {
  const [list, _setList] = useState([
    { id: '1', name: 'test1' },
    { id: '2', name: 'test2' },
  ]);
  return (
    <SelectItem
      listTeamPermission={list}
      handleNewTeam={(value, form) => {
        message.error('Thêm thất bại!');
      }}
      handleDeleteTeam={(value) => {
        message.error('Xoá thất bại!');
      }}
    />
  );
};

export const NoOption = Template.bind({});
NoOption.args = {};
