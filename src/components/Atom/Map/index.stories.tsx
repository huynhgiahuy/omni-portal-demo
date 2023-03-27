import { ComponentMeta, ComponentStory } from '@storybook/react';

import Map from './index';

export default {
  title: 'HappyConnect/Atom/Map',
  component: Map,
  argTypes: {},
} as ComponentMeta<typeof Map>;

const Template: ComponentStory<typeof Map> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto auto' }}>
    <Map {...args} />
  </div>
);
export const Default = Template.bind({});
Default.args = {
  markers: [
    {
      id: 1,
      lat: 14.0583,
      lng: 108.2772,
      color: 'red',
      popName: 'AGGP055',
      branchName: 'Chi nhánh An Giang',
      problem: 20,
      khah: 100,
    },
    {
      id: 2,
      lat: 16.0583,
      lng: 106.2772,
      color: 'green',
      popName: 'AGGP055',
      branchName: 'Chi nhánh An Giang',
      problem: 20,
      khah: 100,
    },
    {
      id: 3,
      lat: 16.345768,
      lng: 112.950439,
      color: 'green',
      popName: 'AGGP055',
      branchName: 'Chi nhánh An Giang',
      problem: 20,
      khah: 100,
    },
  ],
};
