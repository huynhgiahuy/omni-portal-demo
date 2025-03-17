import { ComponentMeta, ComponentStory } from '@storybook/react';

import HistoryCall from './index';

export default {
  title: 'HappyConnect/Molecules/HistoryCall',
  component: HistoryCall,
  argTypes: {},
} as ComponentMeta<typeof HistoryCall>;

const Template: ComponentStory<typeof HistoryCall> = (args) => <HistoryCall {...args} />;

export const NoNote = Template.bind({});
NoNote.args = {};

export const Notes = Template.bind({});
Notes.args = {
  notes: [
    {
      personnel: 'Test1',
      call_direction: 'inbound',
      content: 'cuộc gọi đến',
      create_at: 1677730815,
    },
    {
      personnel: 'Test2',
      call_direction: 'outbound',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
    {
      personnel: 'Test3',
      call_direction: 'local',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
    {
      personnel: 'Test1',
      call_direction: 'inbound',
      content: 'cuộc gọi đến',
      create_at: 1677730815,
    },
    {
      personnel: 'Test2',
      call_direction: 'outbound',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
    {
      personnel: 'Test3',
      call_direction: 'local',
      content: 'Cuộc gọi đi',
      create_at: 1677730815,
    },
  ],
};
