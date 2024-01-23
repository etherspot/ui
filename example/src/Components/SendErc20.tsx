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

import { useState } from 'react';
import { ethers } from 'ethers';
import { SendErc20 } from '@etherspot/etherspot-ui';

const SendErc20Token = () => {
  const [inputValue, setInputValue] = useState('');

  const providerWallet = new ethers.Wallet('0x673c79ab4c60f8d9e343aebc147d9e5cd670cab76c7328b03a23d0fef0aa734f');

  return (
    <div className="items-center">
      <SendErc20
        disableSendOnEnter
        approveFirst
        chainId={80001}
        provider={providerWallet}
        value={inputValue}
        onChangeValue={setInputValue}
        decimals={18}
        tokenAddress={'0xd426c19d6087a716c0e73e8fbd852203047463f0'}
        receiverAddress={'0x77ac7B8b87DB882b8319E28988f12153140dB234'}
        className="block rounded-md border-0 px-3.5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        buttonClassName="flex py-2 rounded w-36 pt-100 text-black"
        onEstimated={(res: any) => console.log('ON Estimates', res)}
        onExecutionStatus={(status) => console.log('ON Execution', status)}
        onSent={(sentRes) => console.log('ON Sent', sentRes)}
      />
    </div>
  );
};

export default SendErc20Token;
