/* MIT License
 *
 * Copyright (c) 2024 Etherspot
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

import React from 'react';
import { EtherspotApprovalTransaction } from '@etherspot/transaction-kit';
import { isEmpty } from 'lodash';

// Utils
import { erc20ValidationMessage } from '../../utils/validation';

// Types
import type { SendERC20TransactionProps } from '../../models/Transactions';

/**
 * @name ApprovalTransaction
 * @description: The following block is the first transaction in this batch
    of transactions, and instructs Etherspot to set a spending
    limit for the Smart Contract located at `receiverAddress`
    to be allowed to spend the token located at `tokenAddress`
    up to the amount specified in `value`.
 * @param {SendERC20TransactionProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */
function ApprovalTransaction(props: SendERC20TransactionProps) {
  const { approveFirst } = props;

  if (!isEmpty(erc20ValidationMessage(props)) || !approveFirst) return null;

  return <EtherspotApprovalTransaction {...props} />;
}

export default ApprovalTransaction;
