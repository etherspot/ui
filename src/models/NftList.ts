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

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Local
import type { BasicProps } from './Common';

export type NftListProps = BasicProps & NftListComponentProps;

export interface NftListComponentProps {
  accountAddress?: string;
  unstyled?: string;
  limit?: number;
  loadingText?: string;
  noNftText?: string;
  visibleLoader?: boolean;
  visibleNoDataText?: boolean;
  unorderedListContainerClassName?: string;
  listItemContainerClassName?: string;
  unorderedListIterableContainerClassName?: string;
  nftMediaClassName?: string;
  nftImageClassName?: string;
  nftNameClassName?: string;
  nftTokenIdClassName?: string;
  nftTokenAmountClassName?: string;
  dataApiKey?: string;
  bundlerApiKey?: string;
  onFetching?: (status: boolean) => void;
  onNFts?: (nftCollection: NftCollection[]) => void;
  CustomNFTComponent?: (nftCollection: NftCollection[]) => any;
  renderNFTItem?: (nfts: NftCollection) => any;
  renderNFTCollectionItem?: (nftItem: Nft) => any;
}

// eslint-disable-next-line no-unused-vars
enum TokenTypes {
  Erc20 = 'Erc20',
  Erc721 = 'Erc721',
  Erc1155 = 'Erc1155',
  Native = 'Native',
  WrappedSupertoken = 'WrappedSupertoken',
}

export interface Nft {
  tokenId: string;
  name: string;
  amount: number;
  image: string;
  ipfsGateway?: string;
}

export interface NftCollection {
  contractName: string;
  contractSymbol: string;
  contractAddress: string;
  tokenType?: TokenTypes;
  nftVersion?: string;
  nftDescription?: string;
  balance: number;
  items: Nft[];
}
