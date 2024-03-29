/* MIT License
 *
 * Copyright (c) 2023 Etherspot
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

import { TokenSelector as TokenListSelector } from '@etherspot/etherspot-ui';
import { ethers } from 'ethers';

const TokenSelector = () => {
  const providerWallet = new ethers.Wallet('0x673c79ab4c60f8d9e343aebc147d9e5cd670cab76c7328b03a23d0fef0aa734f');

  return (
    <div className="flex items-center">
      <TokenListSelector
        provider={providerWallet}
        chainId={1}
        debug
        dropdownHeight="250px"
        dropdownWidth="250px"
        onSelect={(tokens) => console.log('Selected tokens: ', tokens)}
      />
    </div>
  );
};

export default TokenSelector;
