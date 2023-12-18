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

  const [amount, setAmount] = useState('0.001');
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [error, setError] = useState('');
  const randomWallet = ethers.Wallet.createRandom();
  const providerWallet = new ethers.Wallet(randomWallet.privateKey);

  useEffect(() => {
    // Add event listener for triggerElement click
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

  useEffect(() => {
    // validate receiver address
    if(isValidEthereumAddress(receiverAddress)){  
      setIsValidAddress(true);
    }else{
      setIsValidAddress(false);
    }
  }, [receiverAddress]);

  // handle on key press logic of sending 
  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!disableSendOnEnter && event.key === 'Enter') {
      // Trigger sending logic here
      estimateAndSend()
    }
  };

  // on change logic
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  // logic of estimate and send based on props
  const estimateAndSend = async () => {
    if(isValidAddress){

      // estimate logic
      
      if (!onlyEstimate) {
        // send logic here 
      }
      if(debug){
        console.log('send');
      }
    }
    else{
      setError('Receiver address is not blockchain address');
    }
  };
  
  const transactionKitProps = {
    provider: providerWallet,
    to: receiverAddress,
    chainId: chain,
    amount: onlyEstimate ? 0 : parseFloat(amount),
    debug,
  };

  return (

    <EtherspotTransactionKit provider={transactionKitProps.provider} chainId={transactionKitProps.chainId}>
      <EtherspotBatches>
        <EtherspotBatch>
          <EtherspotTransaction to={transactionKitProps.to} value={transactionKitProps.amount}>
            <div className="mt-2.5">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                onKeyDown={handleEnterPress}
                placeholder="Enter Amount"
                className= {unstyled ? '' : className }
                style={style}
              />
              {error ? <p className='text-sm'>{error}</p> : ''}
            </div>
          </EtherspotTransaction>
        </EtherspotBatch>
      </EtherspotBatches>
    </EtherspotTransactionKit>
  );

};

export default SendNativeToken;