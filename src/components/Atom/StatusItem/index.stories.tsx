import { ComponentMeta, ComponentStory } from '@storybook/react';

import StatusItem from './index';

export default {
  title: 'HappyConnect/Atom/StatusItem',
  component: StatusItem,
  argTypes: {
    status: {
      options: ['ready', 'abscent', 'not-disturb', 'no-activity', 'offline'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof StatusItem>;

const Template: ComponentStory<typeof StatusItem> = (args) => <StatusItem {...args} />;

export const Ready = Template.bind({});
Ready.args = {
  status: 'ready',
};

export const Abscent = Template.bind({});
Abscent.args = {
  status: 'abscent',
};

export const NotDisturb = Template.bind({});
NotDisturb.args = {
  status: 'not-disturb',
};

export const NotActivity = Template.bind({});
NotActivity.args = {
  status: 'no-activity',
};

export const Offline = Template.bind({});
Offline.args = {
  status: 'offline',
};
