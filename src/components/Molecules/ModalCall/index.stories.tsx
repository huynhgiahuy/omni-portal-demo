import { ComponentMeta, ComponentStory } from '@storybook/react';

import ModalCall from './index';

export default {
  title: 'Molecules/ModalCall',
  component: ModalCall,

  argTypes: {},
} as ComponentMeta<typeof ModalCall>;

const Template: ComponentStory<typeof ModalCall> = (args) => <ModalCall {...args} />;

export const RingCall = Template.bind({});
RingCall.args = {
  type: 'ring',
  isFullScreenModal: true,
  isModalOpen: true,
};
