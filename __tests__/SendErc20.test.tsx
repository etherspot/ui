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
import { ethers } from 'ethers';
import { render, fireEvent, cleanup, getByRole, getByTestId } from '@testing-library/react';
import SendErc20 from '../src/components/SendErc20';

afterEach(cleanup);

const ethersProvider = new ethers.providers.JsonRpcProvider('http://localhost:3000', 'goerli'); // replace with your node's RPC URL
const provider = ethers.Wallet.createRandom().connect(ethersProvider);

test('Send ERC-20 token renders correctly', () => {
  const tree = render(
    <SendErc20
      disableSendOnEnter
      approveFirst
      chainId={1}
      provider={provider}
      value={'0.1'}
      onChangeValue={() => {}}
      decimals={9}
      tokenAddress={'0xE17f017475a709De58E976081eB916081ff4c9d5'}
      receiverAddress={'0x0493b9a21dE42546B2E3687Da683D0B7B6ec2180'}
      className="block rounded-md border-0 px-3.5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />,
  );
  expect(tree).toMatchSnapshot();
});

test('input value updates correctly', () => {
  // Arrange
  const { getByPlaceholderText } = render(
    <SendErc20
      disableSendOnEnter
      approveFirst
      chainId={1}
      provider={provider}
      onChangeValue={() => {}}
      decimals={9}
      tokenAddress={'0xE17f017475a709De58E976081eB916081ff4c9d5'}
      receiverAddress={'0x0493b9a21dE42546B2E3687Da683D0B7B6ec2180'}
      className="block rounded-md border-0 px-3.5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputElement: any = getByPlaceholderText('0.00');
  fireEvent.change(inputElement, { target: { value: '0.123' } });

  expect(inputElement.value).toBe('0.123');
});
