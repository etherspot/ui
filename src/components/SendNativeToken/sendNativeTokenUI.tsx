/* MIT License
 * 
 * Copyright (c) [Year] [Author]
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
 * @property {React.CSSProperties} [style] - Inline styles for the component.
 * @property {boolean} [unstyled=false] - Flag indicating whether to apply default styles.
 * @property {boolean} [debug=false] - Flag indicating whether to enable debugging.
 * @property {React.ReactNode | React.RefObject<HTMLElement>} [triggerElement] - Trigger element for UI interactions.
 * @property {boolean} [disableSendOnEnter=false] - Flag indicating whether to disable sending on Enter key press.
 * @property {boolean} [onlyEstimate=false] - Flag indicating whether to only estimate the transaction.
 */

/**
 * SendNativeTokenUI component for sending native tokens using the EtherspotTransactionKit.
 *
 * @param {SendNativeTokenUIProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered component.
 */

const SendNativeTokenUI = ({
  receiverAddress,
  chain,
  className,
  style,
  unstyled = false,
  debug = false,
  triggerElement,
  disableSendOnEnter = false,
  onlyEstimate = false,
}: SendNativeTokenUIProps): React.ReactElement => {

  // State for the amount input
  const [amount, setAmount] = useState('0.001');
  // State for checking if the receiver address is valid
  const [isValidAddress, setIsValidAddress] = useState(true);
  // State for handling errors
  const [error, setError] = useState('');

  // Hooks from the EtherspotTransactionKit for transaction estimation and sending
  const { estimate, send } = useEtherspotTransactions();

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

  // Effect to validate the receiver address
  useEffect(() => {
    if (isValidEthereumAddress(receiverAddress)) {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }
  }, [receiverAddress]);

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
    if (isValidAddress) {
      // Estimate logic
      const gasEstimation = await estimate();

      if (!onlyEstimate) {
        // Send logic
        send();
      }

      if (debug) {
        console.log('Transaction sent successfully');
      }
    } else {
      setError('Receiver address is not a valid blockchain address');
    }
  };

  // Rendering the UI component
  return (
    <EtherspotBatches>
      <EtherspotBatch>
        <EtherspotTransaction to={receiverAddress} value={amount}>
          <div className="mt-2.5">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              onKeyDown={handleEnterPress}
              placeholder="Enter Amount"
              className={unstyled ? '' : className}
              style={style}
            />
            {error ? <p className='text-sm'>{error}</p> : ''}
          </div>
        </EtherspotTransaction>
      </EtherspotBatch>
    </EtherspotBatches>
  );
};

export default SendNativeTokenUI;