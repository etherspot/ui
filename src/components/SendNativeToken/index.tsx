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

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { useEtherspotTransactions } from '@etherspot/transaction-kit';

// Types
import type { SendNativeTokenProps } from '../../models/Transactions';

// Utils
import { errorLog } from '../../utils/common';
import { nativeTokenValidationMessage } from '../../utils/validation';

// Local
import withTransactionKit from './withTransactionKit';
import EtherspotTokenTransaction from './EtherspotTransaction';
import TokenInput from './TokenInput';

// Required Props for the SendNativeToken component
/**
 * @typedef {Object} SendNativeTokenProps - Props for the SendNativeTokenProps component.
 * @property {string} receiverAddress - The Ethereum address of the receiver.
 * @property {string} value - value of NativeToken token.
 * @property {string} onChangeValue - gets updated value from onChangeValue.
 * @property {number} chainId - The Ethereum chain ID.
 * @property {ethers.Wallet} provider - The Ethereum provider.
 * @property {number} decimals - decimals for Native token(using for convert number to bignumber).
 */

/**
 * @name SendNativeToken
 * @description Using SendNativeToken component provides a UI for sending native crypto tokens
 * to another Ethereum address using the EtherspotTransactionKit. This user-friendly interface 
 * is designed to simplify the complex underlying transaction mechanics, making it accessible 
 * to users who may not be familiar with the intricacies of blockchain transactions.
 * @param {SendNativeTokenProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */
const SendNativeToken = (props: SendNativeTokenProps) => {
  const {
    debug,
    onlyEstimate,
    onSent,
    onEstimated,
    handleEnterPress,
    onExecutionStatus,
    containerClassName,
    buttonContainerClassName,
    buttonClassName,
    buttonTitle,
  } = props;

  const { estimate, send } = useEtherspotTransactions();

  const [isEstimate, setIsEstimate] = useState(false);

  // if disableSendOnEnter is false then fired this fn.
  const onEnterPress = () => {
    estimateAndSend();
    handleEnterPress && handleEnterPress();
  };

  // Execution for estimation and send process.
  const estimateAndSend = async () => {
    // Return if the token address, receiver address or value not valid.
    if (!isEmpty(nativeTokenValidationMessage(props)) || isEstimate) return;
    
    setIsEstimate(true);
    onExecutionStatus && onExecutionStatus(true);
    /**
       * Any transaction that is intended to be sent to the blockchain must be estimated first. 
         The estimation function performs several checks including cost estimation and transaction validity. 
         This method must always be called before we send, otherwise the send method will return an error.
       */
    let estimatedResponse;
    try {
      estimatedResponse = await estimate();
      onEstimated && onEstimated(estimatedResponse);
    } catch (e) {
      errorLog(
        'Etherspot UI: Sorry there was an error whilst estimating your transaction. Please visit our documentation for more information: https://etherspot.fyi',
        e,
        debug,
      );
    }

    if (!isEmpty(estimatedResponse) && !onlyEstimate) {
      /**
         * The send function simply sends all the EtherspotBatches, 
           which contain all EtherspotBatch and EtherspotTransaction 
           components to the blockchain via the Etherspot platform. 
        */
      try {
        const response = await send();
        onSent && onSent(response);
      } catch (e) {
        errorLog(
          'Etherspot UI: Sorry there was an error whilst sending your transaction. Please visit our documentation for more information: https://etherspot.fyi',
          e,
          debug,
        );
      }
    }

    setIsEstimate(false);
    onExecutionStatus && onExecutionStatus(false);
  };

  return (
    <div className={containerClassName}>
      <EtherspotTokenTransaction {...props} />
      <TokenInput {...props} handleEnterPress={onEnterPress} />

      <div className={buttonContainerClassName}>
        <button onClick={estimateAndSend} className={buttonClassName}>
          {buttonTitle ?? (onlyEstimate ? 'Estimate' : 'Send')}
        </button>
      </div>
    </div>
  );
};

// Wrap the SendNativeToken component with the withTransactionKit HOC to provide transaction functionality
export default withTransactionKit(SendNativeToken);
