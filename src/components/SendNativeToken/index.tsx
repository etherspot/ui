import React, {useRef} from 'react';
import   SendNativeTokenUI   from './sendNativeTokenUI';
import {
  EtherspotTransactionKit
} from "@etherspot/transaction-kit";
import { ethers } from "ethers";

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
}

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
}: SendNativeTokenProps) => {
  const randomWallet = ethers.Wallet.createRandom();
  const providerWallet = new ethers.Wallet(randomWallet.privateKey);
  const triggerElementRef = useRef<HTMLButtonElement>(null);
  console.log(providerWallet);
  return (
  <EtherspotTransactionKit
    provider={providerWallet} /* The random wallet we created above */
    chainId={chain}
  >
     <SendNativeTokenUI
        receiverAddress={receiverAddress}
        chain={chain} 
        className= {className}
        unstyled={unstyled} 
        debug={debug}
        disableSendOnEnter={disableSendOnEnter}
        onlyEstimate={onlyEstimate}
        style={style}
        triggerElement={triggerElementRef}
      />
     </EtherspotTransactionKit>
  );
};
export default SendNativeToken;
