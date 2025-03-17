import { ComponentMeta, ComponentStory } from '@storybook/react';

import MarkerMap from './index';

export default {
  title: 'HappyConnect/Atom/MarkerMap',
  component: MarkerMap,
  argTypes: {},
} as ComponentMeta<typeof MarkerMap>;

const Template: ComponentStory<typeof MarkerMap> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto auto' }}>
    <MarkerMap {...args} />
  </div>
);

export const View = Template.bind({});
View.args = {
  color: 'red',
  popName: 'AGGP055',
  branchName: 'Chi nhánh An Giang',
  problem: 20,
  khah: 100,
};
