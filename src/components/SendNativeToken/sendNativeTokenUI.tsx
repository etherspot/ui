import React, { useState, KeyboardEvent, useEffect } from 'react';
import {
  EtherspotBatches,
  EtherspotBatch,
  EtherspotTransaction,
  useEtherspotTransactions,
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
}: SendNativeTokenProps) => {

  const [amount, setAmount] = useState('0.001');
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [error, setError] = useState('');
  const { estimate, send } = useEtherspotTransactions();
  const randomWallet = ethers.Wallet.createRandom();
  const providerWallet = new ethers.Wallet(randomWallet.privateKey);
  console.log(providerWallet);

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
  /*const estimateAndSend = async () => {
    if (isValidAddress) {
      // Estimate logic
      const gasEstimation = await transactionKitProps.provider.estimateGas({
        to: transactionKitProps.to,
        value: transactionKitProps.amount,
      });
  
      if (!onlyEstimate) {
        // Send logic
        try {
          const transactionHash = await transactionKitProps.provider.sendTransaction({
            to: transactionKitProps.to,
            value: transactionKitProps.amount,
            gasLimit: gasEstimation.toNumber() + 10000, // Adding some buffer to the estimated gas limit
          });
  
          console.log('Transaction sent! Transaction Hash:', transactionHash);
          // Optionally, you can handle the success of the transaction here
        } catch (error) {
          console.error('Error sending transaction:', error);
          // Optionally, you can handle the failure of the transaction here
        }
      }
  
      if (debug) {
        console.log('send');
      }
    } else {
      setError('Receiver address is not a valid blockchain address');
    }
  }; */

  const estimateAndSend = async () => {
    if (isValidAddress) {
      // Estimate logic
      const gasEstimation = await estimate();
  
      if (!onlyEstimate) {
       send();
      }
  
      if (debug) {
        console.log('send');
      }
    } else {
      setError('Receiver address is not a valid blockchain address');
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
  );
  
};

export default SendNativeTokenUI;