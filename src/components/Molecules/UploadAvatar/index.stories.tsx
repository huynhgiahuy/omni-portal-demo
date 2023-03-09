import { ComponentMeta, ComponentStory } from '@storybook/react';

import UploadAvatar from './index';

export default {
  title: 'HappyConnect/Molecules/UploadAvatar',
  component: UploadAvatar,
  argTypes: {},
} as ComponentMeta<typeof UploadAvatar>;

const Template: ComponentStory<typeof UploadAvatar> = (args) => <UploadAvatar {...args} />;

export const NoAvater = Template.bind({});
NoAvater.args = {
  handleUploadAvatar: (e) => {
    console.log(e);
  },
};

export const Avatar = Template.bind({});
Avatar.args = {
  avatar: 'https://picsum.photos/200/300',
  handleUploadAvatar: (e) => {
    console.log(e);
  },
};
