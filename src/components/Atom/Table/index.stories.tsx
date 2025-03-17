import { ComponentMeta, ComponentStory } from '@storybook/react';

import TableComponent from './index';

export default {
  title: 'HappyConnect/Atom/TableComponent',
  component: TableComponent,
  argTypes: {},
} as ComponentMeta<typeof TableComponent>;

const Template: ComponentStory<typeof TableComponent> = (args) => {
  return <TableComponent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      width: '20px',
      render: (text, record, idx) => {
        return idx + 1;
      },
    },
    {
      title: 'Tên vai trò',
      dataIndex: 'code',
      key: 'code',
      width: '200px',
    },
    {
      title: 'Mô tả vai trò',
      dataIndex: 'desc',
      key: 'desc',
      render: (text) => {
        return text ? text : '-';
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'create_by',
      key: 'create_by',
    },
  ],
  dataSource: [
    { code: 'name', desc: 'ví dụ', create_by: 'You' },
    { code: 'name', desc: 'ví dụ', create_by: 'You' },
    { code: 'name', desc: 'ví dụ', create_by: 'You' },
  ],
};
