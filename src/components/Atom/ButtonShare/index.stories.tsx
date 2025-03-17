import { ComponentMeta, ComponentStory } from '@storybook/react';

import ButtonShare from './index';

export default {
  title: 'HappyConnect/Atom/ButtonShare',
  component: ButtonShare,
  argTypes: {},
} as ComponentMeta<typeof ButtonShare>;

const Template: ComponentStory<typeof ButtonShare> = (args) => <ButtonShare {...args} />;

export const Default = Template.bind({});
Default.args = {
  handleUserTransfer: (e) => {
    console.log('handelUserTransfer', e);
  },
  onClickChangeCall: (e) => {
    console.log('onClickChangeCall', e);
  },
  listTransfer: [{ id: '1', label: 'test', value: '12021' }],
};
