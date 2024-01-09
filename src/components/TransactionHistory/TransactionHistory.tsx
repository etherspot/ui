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

import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { isEmpty } from 'lodash';

// Hooks
import { useTransactions } from '../../hooks/useTransactions';

// Constants
import { LOADING, NO_TRANSACTION } from '../../constants/TransactionHistory';

// Types
import type { TransactionHistoryProps } from '../../models/TransactionHistory';

function TransactionHistoryList(props: TransactionHistoryProps) {
  const {
    debug,
    unstyled,
    linkToBlockExplorer,
    limit,
    showDateTime,
    showTextualTransactionDirection,
    dateTimeDisplayPattern,
    unorderedListClassName,
    listItemClassName,
    directionalArrowClassName,
    transferAmountClassName ,
    tokenSymbolClassName,
    addressClassName,
    datetimeClassName,
    className,
    loadingText = LOADING,
    noTransactionText = NO_TRANSACTION,
  } = props;

  /*
   * Gets Transactions from Transaction kit as per chainId.
   * Gets status(true/false) in isFetching
   */
  const { transactions, isFetching } = useTransactions(debug);

  return (
    <ul className={unstyled ? '' : `list-none ${unorderedListClassName} ${className}`}>
      {isFetching && (
        <div className="w-full h-full flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <text>{loadingText}</text>
        </div>
      )}
      {!isFetching && isEmpty(transactions) && (
        <div className="w-full h-full flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <text>{noTransactionText}</text>
        </div>
      )}
      {transactions.map((transaction, index) => (
        <li key={index} className={`${listItemClassName} ${className}`}>
          <span className={`${directionalArrowClassName} ${className}`}>
            {showTextualTransactionDirection
              ? transaction.direction === 'incoming'
                ? 'Received'
                : 'Sent'
              : transaction.direction === 'incoming'
              ? <ArrowLeftIcon
                  className={ directionalArrowClassName }
                  aria-hidden="true"
                />
              : <ArrowRightIcon
                  className={ directionalArrowClassName }
                  aria-hidden="true"
                />
            }
          </span>
          <span className={`${transferAmountClassName} ${className}`}>
            {transaction.amount} {transaction.tokenSymbol}
          </span>
          <span className={`${tokenSymbolClassName} ${className}`}>{transaction.tokenSymbol}</span>
          <span className={`${addressClassName} ${className}`}>{transaction.address}</span>
          {showDateTime && (
            <span className={`${datetimeClassName} ${className}`}>
              {DateTime.fromMillis(transaction.timestamp).toFormat(dateTimeDisplayPattern)}
            </span>
          )}
          {linkToBlockExplorer && (
            <a
              href={`https://block-explorer-link/${transaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Block Explorer
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TransactionHistoryList;
