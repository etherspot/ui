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
import React, { useState, KeyboardEvent, useEffect } from 'react';

// Services
import {
  EtherspotBatches,
  EtherspotBatch,
  EtherspotTransaction,
  useEtherspotTransactions,
} from "@etherspot/transaction-kit";

// Utils
import { isValidEthereumAddress } from '../../utils/validation';

// Props interface for the SendNativeTokenUI component
/**
 * @typedef {Object} SendNativeTokenUIProps - Props for the SendNativeTokenUI component.
 * @property {string} receiverAddress - The Ethereum address of the receiver.
 * @property {number} chain - The Ethereum chain ID.
 * @property {string} [className] - Additional CSS class for styling.
 * @property {string} [errorMessageClass] - Additional CSS class for error styling.
 * @property {React.CSSProperties} [style] - Inline styles for the component.
 * @property {boolean} [unstyled=false] - Flag indicating whether to apply default styles.
 * @property {boolean} [debug=false] - Flag indicating whether to enable debugging.
 * @property {React.ReactNode | React.RefObject<HTMLElement>} [triggerElement] - Trigger element for UI interactions.
 * @property {boolean} [disableSendOnEnter=false] - Flag indicating whether to disable sending on Enter key press.
 * @property {boolean} [onlyEstimate=false] - Flag indicating whether to only estimate the transaction.
 */

/**
 * @name SendNativeTokenUI
 * @description SendNativeTokenUI component provides a UI for sending native crypto tokens
 * to another Ethereum address using the EtherspotTransactionKit. This user-friendly interface 
 * is designed to simplify the complex underlying transaction mechanics, making it accessible 
 * to users who may not be familiar with the intricacies of blockchain transactions.
 * @param {SendNativeTokenUIProps} props - The props for the component.
 * 
 * @returns {React.ReactElement} The rendered component.
 */

const SendNativeTokenUI = ({
  receiverAddress,
  chain,
  className,
  errorMessageClass,
  style,
  unstyled = false,
  debug = false,
  triggerElement,
  disableSendOnEnter = false,
  onlyEstimate = false,
}: SendNativeTokenUIProps): React.ReactElement => {

  // State for the amount input
  const [amount, setAmount] = useState('0');
  // State for checking if the receiver address is valid
  const [isValidAddress, setIsValidAddress] = useState(false);
  // State for handling errors
  const [error, setError] = useState('');

  // Hooks from the EtherspotTransactionKit for transaction estimation and sending
  const { estimate, send } = useEtherspotTransactions();

  // Effect to validate the receiver address
  useEffect(() => {
    const validateAddress = async () => {
      if (isValidEthereumAddress(receiverAddress)) {
        setIsValidAddress(true);
      } else {
        setIsValidAddress(false);
      }
    };
  
    validateAddress();
  }, [receiverAddress]);
  
  // Effect to add and remove event listener for triggerElement click
  useEffect(() => {
    const triggerElementRef = triggerElement as React.MutableRefObject<HTMLElement> | undefined;
    if (triggerElementRef && triggerElementRef.current) {
      triggerElementRef.current.addEventListener('click', estimateAndSend);
    }

    // Cleanup
    return () => {
      if (triggerElementRef && triggerElementRef.current) {
        triggerElementRef.current.removeEventListener('click', estimateAndSend);
      }
    };
  }, [triggerElement]);

  // Handling key press events, specifically Enter key, for sending transactions
  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!disableSendOnEnter && event.key === 'Enter') {
      estimateAndSend();
    }
  };

  // Handling input change events for the amount
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  // Logic for estimating and sending transactions
  const estimateAndSend = async () => {
    try {
      if (isValidAddress) {
        // Estimate logic
        const gasEstimation = await estimate();
  
        if (!onlyEstimate) {
          // Send logic
          await send();
          console.log('Transaction sent successfully');
        }
        // Log gas estimation result
        console.log('Gas estimation result:', gasEstimation);
      } else {
        setError('Receiver address is not a valid blockchain address. Please double-check and try again.');
      }
    } catch (e) {
      if (debug) {

        if (e instanceof Error && e?.message) {
          console.error(`Error in gas estimation and sending transaction: ${e.message}`);
        }
        
      }
  
      setError(
        `An error occurred during the transaction. Please try again.${
          debug ? ' Check the console for more details. If the issue persists, refer to the Etherspot documentation: https://etherspot.dev/docs' : ''
        }`
      );
    }
  };

  // Rendering the UI component
  return (
    <EtherspotBatches>
      <EtherspotBatch>
        <EtherspotTransaction to={receiverAddress} value={amount}>
          <div>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              onKeyDown={handleEnterPress}
              placeholder="Enter Amount"
              className={unstyled ? '' : className}
              style={style}
            />
            {error ? <p className={unstyled ? '' : errorMessageClass} style={style}>{error}</p> : ''}
          </div>
        </EtherspotTransaction>
      </EtherspotBatch>
    </EtherspotBatches>
  );
};

export default SendNativeTokenUI;
