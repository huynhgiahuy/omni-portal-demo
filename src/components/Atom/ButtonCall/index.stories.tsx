import { ComponentMeta, ComponentStory } from '@storybook/react';

import ButtonCall from './index';

export default {
  title: 'HappyConnect/Atom/ButtonCall',
  component: ButtonCall,
  argTypes: {
    type: {
      options: ['reveice', 'hang-up', 'mute', 'un-mute', 'pause', 'play'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof ButtonCall>;

const Template: ComponentStory<typeof ButtonCall> = (args) => <ButtonCall {...args} />;

export const ReceiveCall = Template.bind({});
ReceiveCall.args = {
  type: 'reveice',
  onClick: () => {
    console.log('reveice');
  },
};

export const HangUpCall = Template.bind({});
HangUpCall.args = {
  type: 'hang-up',
  onClick: () => {
    console.log('hangUp');
  },
};

export const PlayCall = Template.bind({});
PlayCall.args = {
  type: 'play',
  onClick: () => {
    console.log('play');
  },
};

export const PauseCall = Template.bind({});
PauseCall.args = {
  type: 'pause',
  onClick: () => {
    console.log('pause');
  },
};

export const MuteCall = Template.bind({});
MuteCall.args = {
  type: 'mute',
  onClick: () => {
    console.log('mute');
  },
};

export const UnMuteCall = Template.bind({});
UnMuteCall.args = {
  type: 'un-mute',
  onClick: () => {
    console.log('un-mute');
  },
};
