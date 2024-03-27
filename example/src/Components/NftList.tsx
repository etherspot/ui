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

import { NftList as Nfts } from '@etherspot/etherspot-ui';
import { ethers } from 'ethers';

const NftList = () => {
  const providerWallet = new ethers.Wallet('0x673c79ab4c60f8d9e343aebc147d9e5cd670cab76c7328b03a23d0fef0aa734f');
  const accountAddress = '0x89a3d6AF00a3627DA25E2e8FFCCb97FE74D52631';
  
  return (
    <div className="flex items-center border">
      <Nfts 
        provider={providerWallet} 
        accountAddress={accountAddress}
        chainId={137}
        dataApiKey={process.env.ETHERSPOT_DATA_API_KEY ?? ''}
        bundlerApiKey={process.env.ETHERSPOT_BUNDLER_API_KEY ?? ''}
        nftImageClassName="w-5 h-5 rounded" 
        unorderedListIterableContainerClassName= "border-2" 
        listItemContainerClassName="py-2 px-4" 
        nftMediaClassName="border border-gray-200" 
        nftNameClassName="border border-gray-200"
        nftTokenIdClassName="border border-gray-200"
        nftTokenAmountClassName="border border-gray-200" 
      />
    </div>
  );
};

export default NftList;
