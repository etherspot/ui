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

import React from 'react';
import { EtherspotBatch, EtherspotBatches, EtherspotTransactionKit } from '@etherspot/transaction-kit';

// Types
import { SendNativeTokenProps } from '../../models/Transactions';

// Required Props for the SendNativeToken component
/**
 * @typedef {Object} SendNativeTokenProps - Props for the SendNativeTokenProps component.
 * @property {string} receiverAddress - The Ethereum address of the receiver.
 * @property {string} value - value of Native token.
 * @property {string} onChangeValue - gets updated value from onChangeValue.
 * @property {number} chainId - The Ethereum chain ID.
 * @property {ethers.Wallet} provider - The Ethereum provider.
 * @property {number} decimals - decimals for Native token(using for convert number to bignumber).
 */

/**
 * @name SendNativeToken
 * @description Using SendNativeToken component to we can send token. 
    For sending token need tokenAddress, receiverAddress and value.
 * @param {SendNativeTokenProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */
const withTransactionKit = (WrappedComponent) => {
  // This is a higher-order component that wraps the provided component with the EtherspotTransactionKit and related components
  const TransactionKit = (props: SendNativeTokenProps) => {
    const { chainId, provider } = props;

    return (
      <EtherspotTransactionKit provider={provider} >
        <EtherspotBatches>
          <EtherspotBatch chainId={chainId}>
            <WrappedComponent {...props} />
          </EtherspotBatch>
        </EtherspotBatches>
      </EtherspotTransactionKit>
    );
  };
  return TransactionKit;
};

export default withTransactionKit;
