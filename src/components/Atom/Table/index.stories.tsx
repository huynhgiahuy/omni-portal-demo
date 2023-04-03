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

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  columns: [],
};
