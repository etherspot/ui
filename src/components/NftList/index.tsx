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

import React from 'react';
import { EtherspotTransactionKit } from '@etherspot/transaction-kit';

// Types
import type { NftListProps } from '../../models/NftList';

// Local
import Nfts from './NftList';

// Required Props for the NftList component
/**
 * @typedef {Object} NftListProps - Props for the NftList component.
 * @property {number} chainId - The Ethereum chain ID.
 * @property {ethers.Wallet} provider - The Ethereum provider.
 */

/**
 * @name NftList
 * @description NftList component provides list of NFTs for either their own account,
   or another account address that they can provide.
   The Etherspot UI component will show a unordered list of NFTs and the data associated with the NFT.
 * @param {NftListProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */
const NftList = (props: NftListProps) => {
  const { provider, chainId } = props;

  return (
    // pass static key value for testing purpose 
    <EtherspotTransactionKit 
        provider={provider} 
        chainId={chainId} 
        dataApiKey='eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9' 
        bundlerApiKey='eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9'>
      <Nfts {...props} />
    </EtherspotTransactionKit>
  );
};

export default NftList;
