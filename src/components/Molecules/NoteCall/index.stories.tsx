import { ComponentMeta, ComponentStory } from '@storybook/react';

import NoteCall from './index';

export default {
  title: 'HappyConnect/Molecules/NoteCall',
  component: NoteCall,
  argTypes: {},
} as ComponentMeta<typeof NoteCall>;

const Template: ComponentStory<typeof NoteCall> = (args) => <NoteCall {...args} />;

export const Default = Template.bind({});
Default.args = {
  handleFormNote: (e) => {
    console.log(e);
  },
};
