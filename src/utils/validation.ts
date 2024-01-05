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

import { ethers } from 'ethers';
import { isEmpty } from 'lodash';

// Types
import type { SendERC20TransactionProps } from '../models/Transactions';

export const isValidEthereumAddress = (address: string | undefined): boolean => {
  if (!address) return false;

  return ethers.utils.isAddress(address);
};

export const erc20ValidationMessage = (props: SendERC20TransactionProps): string => {
  const { tokenAddress, receiverAddress, value } = props;
  if (!isValidEthereumAddress(tokenAddress)) {
    return 'Token addess is not valid!';
  }
  if (!isValidEthereumAddress(receiverAddress)) {
    return 'Receiver addess is not valid!';
  }
  if (isEmpty(value)) {
    return 'Please enter value!';
  }
  return '';
};
