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

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { EtherspotTransactionKit, useEtherspotTransactions } from '@etherspot/transaction-kit';

// Types
import type { TokenSelectorProps } from '../../models/TokenSelector';
import type { SendERC20Props } from '../../models/Transactions';

// Local
import TokenTransferTransaction from './TokenTransferTransaction';
import withTransactionKit from './withTransactionKit';
import ApprovalTransaction from './ApprovalTransaction';
import Erc20Input from './Erc20Input';
import { erc20ValidationMessage, isValidEthereumAddress } from '../../utils/validation';
import { isEmpty } from 'lodash';
import { parseBigNumber } from '../../utils/bigNumber';
import { areEqual } from '../../utils/common';

/**
 * @name SendErc20
 * @description
 * @param {} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */

const SendErc20 = (props: SendERC20Props) => {
  const { triggerElement, onlyEstimate } = props;

  const { estimate, send, batches } = useEtherspotTransactions();

  useEffect(() => {
    if (triggerElement?.current) {
      triggerElement.current.addEventListener('click', estimateAndSend);
    }

    // Cleanup
    return () => {
      if (triggerElement?.current) {
        triggerElement.current.removeEventListener('click', estimateAndSend);
      }
    };
  }, [triggerElement]);

  const estimateAndSend = async () => {
    if (!isEmpty(erc20ValidationMessage(props))) return;
    try {
      const estimateBatches = await estimate();

      // if (!isEmpty(estimateBatches) && !onlyEstimate) {
      //   const estimateBatches = await send();
      // }

      console.log('====================================');
      console.log('Success', estimateBatches);
      console.log('====================================');
    } catch (e) {
      console.log('====================================');
      console.log('ERORRR', e);
      console.log('====================================');
    }
  };

  console.log('====================================');
  console.log('batches', batches);
  console.log('====================================');

  return (
    <>
      <TokenTransferTransaction {...props} />
      <ApprovalTransaction {...props} />
      <Erc20Input {...props} />
    </>
  );
};

export default withTransactionKit(SendErc20);
