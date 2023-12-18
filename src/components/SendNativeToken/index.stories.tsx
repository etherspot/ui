import React from 'react';
import { Meta, Story } from '@storybook/react';
import SendNativeToken  from './index';

export default {
  title: 'Components/SendNativeToken',
  component: SendNativeToken,
} as Meta;

const Template: Story<SendNativeTokenProps> = (args) => <SendNativeToken {...args} />;

export const NativeToken = Template.bind({});
NativeToken.args = {
  receiverAddress: '0x725404c8Eead111d9E6DFE118c535F43402a9511',
  chain: 1,
  className: 'block w-1/2 rounded-md border-1 border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
  unstyled: false,
  debug: true,
  disableSendOnEnter: false,
  onlyEstimate: false,
};


