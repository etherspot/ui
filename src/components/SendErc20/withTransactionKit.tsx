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
import { EtherspotBatch, EtherspotBatches, EtherspotTransactionKit } from '@etherspot/transaction-kit';

// Types
import { SendERC20Props } from '../../models/Transactions';

// Required Props for the SendErc20 component
/**
 * @typedef {Object} SendERC20Props - Props for the SendERC20Props component.
 * @property {string} tokenAddress - Address of ERC20 token.
 * @property {string} receiverAddress - The Ethereum address of the receiver.
 * @property {string} value - value of Erc20 token.
 * @property {string} onChangeValue - gets updated value from onChangeValue.
 * @property {number} chainId - The Ethereum chain ID.
 * @property {ethers.Wallet} provider - The Ethereum provider.
 * @property {number} decimals - decimals for ERC20 token(using for convert number to bignumber).
 * @property {React.ReactNode | React.RefObject<HTMLElement>} [triggerElement] - Trigger element for UI interactions.
 */

/**
 * @name SendErc20
 * @description Using SendErc20 component to we can send Erc20 token. 
    For sending token need tokenAddress, receiverAddress and value.
 * @param {SendERC20Props} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */
const withTransactionKit = (WrappedComponent) => {
  const TransactionKit = (props: SendERC20Props) => {
    const { chainId, provider } = props;

    return (
      <EtherspotTransactionKit provider={provider} chainId={chainId}>
        <EtherspotBatches>
          <EtherspotBatch>
            <WrappedComponent {...props} />
          </EtherspotBatch>
        </EtherspotBatches>
      </EtherspotTransactionKit>
    );
  };
  return TransactionKit;
};

export default withTransactionKit;
