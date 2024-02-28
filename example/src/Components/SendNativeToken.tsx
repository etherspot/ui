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

// Components
import { SendNativeToken } from '@etherspot/etherspot-ui';

const NativeToken = () => {
  const [inputValue, setInputValue] = useState('');

  // Random wallet using ethers
  const randomWallet = ethers.Wallet.createRandom();
  const providerWallet = new ethers.Wallet(randomWallet.privateKey);
  
  return (
    <div className="flex items-center">
      <SendNativeToken
        disableSendOnEnter
        chainId={137}
        provider={providerWallet}
        value={inputValue}
        onChangeValue={setInputValue}
        decimals={18}
        receiverAddress={'0x6a9Adfb9CDE02eEAF196f4350fFd2C76043E957A'}
        className="block rounded-md border-0 px-3.5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        buttonClassName="flex py-2 rounded w-36 pt-100 text-black"
        errorMessageClassName="sm:text-sm "
        onEstimated={(res: any) => console.log('ON Estimates', res)}
        onExecutionStatus={(status: any) => console.log('ON Execution', status)}
        onSent={(sentRes: any) => console.log('ON Sent', sentRes)}
      />
    </div>
  );
};

export default NativeToken;

