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
import React, {useRef} from 'react';

// Components
import SendNativeTokenUI from './SendNativeTokenUI';

// Services
import {
  EtherspotTransactionKit
} from "@etherspot/transaction-kit";

// Props interface for the SendNativeToken component
/**
 * @typedef {Object} SendNativeTokenProps - Props for the SendNativeToken component.
 * @property {string} receiverAddress - The Ethereum address of the receiver.
 * @property {number} chain - The Ethereum chain ID.
 * @property {string} [className] - Additional tailwind CSS class for styling.
 * @property {React.CSSProperties} [style] - Inline styles for the component overwrite tailwind CSS.
 * @property {boolean} [unstyled=false] - Flag indicating whether to apply default styles.
 * @property {boolean} [debug=false] - Flag indicating whether to enable debugging.
 * @property {React.ReactNode | React.RefObject<HTMLElement>} [triggerElement] - Trigger element for UI interactions.
 * @property {boolean} [disableSendOnEnter=false] - Flag indicating whether to disable sending on Enter key press.
 * @property {boolean} [onlyEstimate=false] - Flag indicating whether to only estimate the transaction.
 * @property {Object | undefined} [provider] - Ethereum provider (random wallet provider).
 */

// Props interface for the SendNativeToken component
interface SendNativeTokenProps {
  receiverAddress: string;
  chain: number;
  className?: string;
  style?: React.CSSProperties;
  unstyled?: boolean;
  debug?: boolean;
  triggerElement?: React.ReactNode | React.RefObject<HTMLElement>;
  disableSendOnEnter?: boolean;
  onlyEstimate?: boolean;
  provider?: Object | undefined;
}

/**
 * @name SendNativeToken
 * @description SendNativeTokenUI component provides a UI for sending native crypto tokens
 * to another Ethereum address using the EtherspotTransactionKit.This user-friendly interface 
 * is designed to simplify the complex underlying transaction mechanics, making it accessible 
 * to users who may not be familiar with the intricacies of blockchain transactions.
 * @param {SendNativeTokenProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */

// SendNativeToken component
const SendNativeToken = ({
  receiverAddress,
  chain,
  className,
  style,
  unstyled = false,
  debug = false,
  triggerElement,
  disableSendOnEnter = false,
  onlyEstimate = false,
  provider
}: SendNativeTokenProps) => {
  
  return (
    // EtherspotTransactionKit component, wrapping the SendNativeTokenUI, 
    // Use EtherspotTransactionKit as wrapper from this file and import SendNativeToken from different file, otherwise transaction kit will not find parent provider.
    <EtherspotTransactionKit
      provider={provider}
      chainId={chain}
    >
      {/* Rendering the SendNativeTokenUI component */}
     <SendNativeTokenUI
        receiverAddress={receiverAddress}
        chain={chain} 
        className= {className}
        unstyled={unstyled} 
        debug={debug}
        disableSendOnEnter={disableSendOnEnter}
        onlyEstimate={onlyEstimate}
        style={style}
        triggerElement={triggerElement}
      />
    </EtherspotTransactionKit>
  );
}

export default SendNativeToken;



