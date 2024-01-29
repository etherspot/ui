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

import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';

// Hooks
import { useNftList } from '../../hooks/useNftList';

// Constants
import { NO_NFTS } from '../../constants/NftList';

// Types
import type { Nft, NftCollection, NftListProps } from '../../models/NftList';
import { LoaderText, NoDataText } from '../Common';

/**
 * @name NftListContent
 * @description NftListContent component provides list of NFTs for either their own account,
   or another account address that they can provide.
 * @param {NftListProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */
function NftListContent(props: NftListProps) {
  const {
    unstyled,
    unorderedListContainerClassName,
    listItemContainerClassName,
    limit,
    loadingText,
    noNftText = NO_NFTS,
    onFetching,
    onNFts,
    visibleLoader = true,
    visibleNoDataText = true,
    unorderedListIterableContainerClassName,
    nftMediaClassName,
    nftImageClassName,
    nftNameClassName,
    nftTokenIdClassName,
    nftTokenAmountClassName,
    CustomNFTComponent,
    renderNFTItem,
    renderNFTCollectionItem,
  } = props;

  /*
   * Gets Tokens from Transaction kit as per chainId.
   * Gets status(true/false) in isFetching
   */
  const { nftList, isFetching } = useNftList(props);

  useEffect(() => {
    /*
     * Gets status(true/false) on onFetching prop
     * Gets NFTs on onNFts prop
     */
    onFetching && onFetching(isFetching);
    onNFts && onNFts(nftList);
  }, [nftList, isFetching]);

  /** Using {limit} prop to manage NFT list visibility */
  const listWithLimit = nftList?.slice(0, limit ?? nftList.length + 1);

  return (
    <ul className={unstyled ? '' : unorderedListContainerClassName}>
      <LoaderText isVisible={isFetching && visibleLoader} loadingText={loadingText} />

      <NoDataText isVisible={!isFetching && isEmpty(listWithLimit) && visibleNoDataText} text={noNftText} />

      <li className={listItemContainerClassName}>
        {/** Using CustomNFTComponent to user can make custom component.*/}
        {CustomNFTComponent
          ? CustomNFTComponent(listWithLimit)
          : listWithLimit.map((nftCollection: NftCollection) => {
              {
                /** Using renderNFTItem to user can customize component items.*/
              }
              if (renderNFTItem) {
                return renderNFTItem(nftCollection);
              }

              return nftCollection.items?.map((nft: Nft) => {
                {
                  /** Using renderNFTCollectionItem to user can customize component NFT tokens item.*/
                }
                if (renderNFTCollectionItem) {
                  return renderNFTCollectionItem(nft);
                }
                {
                  /** Render basic info for individual NFT token item*/
                }
                return (
                  <ul key={nft.tokenId} className={unorderedListIterableContainerClassName}>
                    <li className={nftMediaClassName}>
                      <img
                        alt={`${nft?.tokenId} (${nft?.name}) image`}
                        src={nft?.image}
                        className={nftImageClassName}
                        aria-hidden="true"
                      />
                    </li>
                    <li className={nftNameClassName}>{nft?.name}</li>
                    <li className={nftTokenIdClassName}>{nft?.tokenId}</li>
                    <li className={nftTokenAmountClassName}>{nft?.amount}</li>
                  </ul>
                );
              });
            })}
      </li>
    </ul>
  );
}

export default NftListContent;
