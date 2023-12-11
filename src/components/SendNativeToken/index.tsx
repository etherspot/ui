import React, { useState, KeyboardEvent } from 'react';
import {
  EtherspotTransactionKit,
  EtherspotBatches,
  EtherspotBatch,
  EtherspotTransaction,
} from "@etherspot/transaction-kit";
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import { StyleObject } from 'styletron-react';
import { ethers } from "ethers";


interface SendNativeTokenProps {
  receiverAddress: string;
  chain: number;
  style?: StyleObject;
  unstyled?: boolean;
  debug?: boolean;
  disableSendOnEnter?: boolean;
  onlyEstimate?: boolean;
}

const SendNativeToken = ({
  receiverAddress,
  chain,
  style,
  unstyled = false,
  debug = false,
  disableSendOnEnter = false,
  onlyEstimate = false,
}: SendNativeTokenProps) => {

  const [value, setValue] = useState('0.001');
  const [css] = useStyletron();
  const etherspotAddresses = '0x89a3d6AF00a3627DA25E2e8FFCCb97FE74D52631';
  const randomWallet = ethers.Wallet.createRandom();
  const providerWallet = new ethers.Wallet(randomWallet.privateKey);

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!disableSendOnEnter && event.key === 'Enter') {
      // Trigger sending logic here
      estimateAndSend()
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
  };

  const sendButtonHandler = () => {
    // Trigger sending logic here
  };

  const estimateAndSend = async () => {
    // Logic to estimate and send native token using TransactionKit
    // You may need to replace the placeholders with actual functions
   
    if (!onlyEstimate) {
      // send logic here 
    }
  };

  const transactionKitProps = {
    provider: providerWallet,
    to: receiverAddress,
    chainId: chain,
    value: onlyEstimate ? 0 : parseFloat(value),
    debug,
  };

  return (
    
    <div className={css(style)}>
      <h1> Send Native Token</h1>
      <p>{etherspotAddresses}</p>
      <EtherspotTransactionKit provider={transactionKitProps.provider} chainId={transactionKitProps.chainId}>
      <EtherspotBatches via={"etherspot-prime"}>
        <EtherspotBatch>
          <EtherspotTransaction to={transactionKitProps.to} value={transactionKitProps.value}>
          <Input
            value={receiverAddress}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
            placeholder="Enter receiver address"
            overrides={unstyled ? {} : undefined}
          />
          <Input
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
            placeholder="Enter amount value"
            overrides={unstyled ? {} : undefined}
          />
          {!unstyled && (
            <button onClick={sendButtonHandler} disabled={onlyEstimate}>
              Send
            </button>
          )}
      </EtherspotTransaction>
    </EtherspotBatch>
  </EtherspotBatches>
  </EtherspotTransactionKit>
    </div>
    
  );
};

export default SendNativeToken;