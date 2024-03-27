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

import { useEffect, useState } from 'react';
import { useEtherspotNfts } from '@etherspot/transaction-kit';

// Utils
import { printLog, errorLog } from '../utils/common';

// Type
import type { NftCollection, NftListProps } from '../models/NftList';

export const useNftList = ({ chainId, accountAddress, debug = false }: NftListProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [nftList, setNftList] = useState<NftCollection[]>([]);

  const { getAccountNfts } = useEtherspotNfts(chainId);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nfts: any = await getAccountNfts(accountAddress, chainId);
        if(nfts.length == 0){ // api rate limit gives blank result 
          errorLog(
            'Etherspot UI: Sorry there was an error whilst fetching your NFTs. Please see console',
            debug,
          );
        }
        setNftList(nfts);
        setIsFetching(false);
        printLog('Etherspot UI: your NFTs', nfts, debug);
      } catch (error) {
        setIsFetching(false);
        errorLog(
          'Etherspot UI: Sorry there was an error whilst fetching your NFTs. Please visit our documentation for more information: https://etherspot.fyi',
          error,
          debug,
        );
      }
    })();
  }, []);

  return { nftList, isFetching };
};
