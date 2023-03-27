import { ComponentMeta, ComponentStory } from '@storybook/react';

import CommentColumnMap from './index';

export default {
  title: 'HappyConnect/Atom/CommentColumnMap',
  component: CommentColumnMap,
  argTypes: {},
} as ComponentMeta<typeof CommentColumnMap>;

const Template: ComponentStory<typeof CommentColumnMap> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto auto' }}>
    <CommentColumnMap {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
