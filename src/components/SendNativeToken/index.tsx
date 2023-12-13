import React, { useState, KeyboardEvent, useEffect } from 'react';
import {
  EtherspotTransactionKit,
  EtherspotBatches,
  EtherspotBatch,
  EtherspotTransaction,
} from "@etherspot/transaction-kit";
import { ethers } from "ethers";
import { isValidEthereumAddress } from '../../utils/validation';





interface SendNativeTokenProps {
  receiverAddress: string;
  chain: number;
  style?: React.CSSProperties;
  unstyled?: boolean;
  debug?: boolean;
  triggerElement?: string;
  disableSendOnEnter?: boolean;
  onlyEstimate?: boolean;
}

const SendNativeToken = ({
  receiverAddress,
  chain,
  style,
  unstyled = false,
  debug = false,
  triggerElement,
  disableSendOnEnter = false,
  onlyEstimate = false,
}: SendNativeTokenProps) => {

  const [value, setValue] = useState('0.001');
  const [error, setError] = useState('');
  const etherspotAddresses = '0x89a3d6AF00a3627DA25E2e8FFCCb97FE74D52631';
  const randomWallet = ethers.Wallet.createRandom();
  const providerWallet = new ethers.Wallet(randomWallet.privateKey);

  useEffect(() => {
    // Add event listener to trigger element
    const element = document.querySelector(triggerElement || ''); 
    if (element) {
      element.addEventListener('click', estimateAndSend);
    }

    return () => {
      // Remove event listener on component unmount
      if (element) {
        element.removeEventListener('click', estimateAndSend);
      }
    };
  }, [triggerElement]);

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!disableSendOnEnter && event.key === 'Enter') {
      // Trigger sending logic here
      estimateAndSend()
    }
  };

  const handleReceiverAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(isValidEthereumAddress(event.target.value)){  
      setValue(event.target.value);
    }else{
      setError('Please enter valid address');
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const estimateAndSend = async () => {
    // Logic to estimate and send native token using TransactionKit
    // You may need to replace the placeholders with actual functions
   
    if (!onlyEstimate) {
      // send logic here 
    }
  };
  const estimate = async () => {
    // Logic to estimate native token using TransactionKit
    
  };

  const transactionKitProps = {
    provider: providerWallet,
    to: receiverAddress,
    chainId: chain,
    value: onlyEstimate ? 0 : parseFloat(value),
    debug,
  };

  return (
    <div className='bg-gray-200 h-auto'>
      <h1> Send Native Token</h1>
      <p>{etherspotAddresses}</p>
      <EtherspotTransactionKit provider={transactionKitProps.provider} chainId={transactionKitProps.chainId}>
      <EtherspotBatches via={"etherspot-prime"}>
        <EtherspotBatch>
          <EtherspotTransaction to={transactionKitProps.to} value={transactionKitProps.value}>
          <input
            value={receiverAddress}
            onChange={handleReceiverAddressChange}
            placeholder="Enter receiver address"
            overrides={unstyled ? {} : undefined}
          />
          {error ? <div>{error}</div> : ''}
          <input
            value={value}
            onChange={handleAmountChange}
            onKeyDown={handleEnterPress}
            placeholder="Enter amount value"
            overrides={unstyled ? {} : undefined}
          />
          {!unstyled && (
            <button onClick={onlyEstimate ? estimate : estimateAndSend} className="border-2 ml-24" > 
              {onlyEstimate ? 'Estimate' : 'Send'}
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