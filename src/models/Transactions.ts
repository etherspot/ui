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

import type { EstimatedBatch, ISentBatches } from '@etherspot/transaction-kit';
import type { BasicProps } from './Common';

export type SendERC20Props = BasicProps &
  SendERC20TransactionProps &
  SendERC20InputProps &
  SendButtonProps & {
    // eslint-disable-next-line no-unused-vars
    onEstimated?: (estimated: EstimatedBatch[]) => void;
    // eslint-disable-next-line no-unused-vars
    onSent?: (sentBatches: ISentBatches[]) => void;
    // eslint-disable-next-line no-unused-vars
    onExecutionStatus?: (status: boolean) => void;
    onlyEstimate?: boolean;
  };

export type SendERC20TransactionProps = {
  tokenAddress: string;
  receiverAddress: string;
  value: string;
  approveFirst?: boolean;
};

export interface SendButtonProps {
  containerClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTitle?: string;
}

export type SendERC20InputProps = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChangeValue: (value: string) => void;
  decimals?: number;
  className?: string;
  disableSendOnEnter?: boolean;
  handleEnterPress?: () => void;
  errorMessageClassName?: string;
};
