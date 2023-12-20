import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EtherspotTransactionKit } from "@etherspot/transaction-kit";
import { ethers } from 'ethers';

const randomWallet = ethers.Wallet.createRandom();
const providerWallet = new ethers.Wallet(randomWallet.privateKey);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <EtherspotTransactionKit
      provider={providerWallet} /* The random wallet we created above */
      chainId={1}
      >
      <App />
    </EtherspotTransactionKit>  
  </React.StrictMode>
);
