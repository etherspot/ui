/* MIT License
 *
 * Copyright (c) 2024 Etherspot
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ethers } from 'ethers';

// Types
import { NftListProps } from '../../models/NftList';

// Local
import Nfts from './';

export default {
  title: 'Components/NftList',
  component: Nfts,
} as Meta;

const providerWallet = new ethers.Wallet('0x673c79ab4c60f8d9e343aebc147d9e5cd670cab76c7328b03a23d0fef0aa734f');

const Template: StoryFn<NftListProps> = (args) => <Nfts {...args} />;

export const NftList = Template.bind({});
NftList.args = {
  chainId: 1,
  provider: providerWallet,
};