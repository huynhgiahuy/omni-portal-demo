import { ComponentMeta, ComponentStory } from '@storybook/react';

import CustomerInfoForm, { customerInfoProps } from './index';

export default {
  title: 'HappyConnect/Molecules/CustomerInfoForm',
  component: CustomerInfoForm,
  argTypes: {
    type: {
      options: ['edit', 'view'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof CustomerInfoForm>;

const Template: ComponentStory<typeof CustomerInfoForm> = (args) => <CustomerInfoForm {...args} />;

export const View = Template.bind({});
View.args = {
  type: 'view',
  customerInfo: {
    full_name: 'Test1',
    phone_number: '123456789',
    email: 'test@gmail.com',
    work_unit: 'IDC',
    ip_phone: '1111',
  },
};

export const Edit = Template.bind({});
Edit.args = {
  type: 'edit',
  handleSaveForm: (values: customerInfoProps) => {
    console.log(values);
  },
};
