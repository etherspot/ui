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

import React, { useState } from 'react';

// Utils
import { normalizeRawValue, parseBigNumber } from '../../utils/bigNumber';
import { numberInProgressRegex } from '../../utils/common';
import { erc20ValidationMessage } from '../../utils/validation';

// Types
import type { SendERC20InputProps, SendERC20TransactionProps } from '../../models/Transactions';

/**
 * @name Erc20Input
 * @description: Use of Erc20Input as token value input.
 * @param {SendERC20InputProps & SendERC20TransactionProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */
function Erc20Input(props: SendERC20InputProps & SendERC20TransactionProps) {
  const { value, errorMessageClassName, onChangeValue, decimals, className, disableSendOnEnter, handleEnterPress } =
    props;

  const [errorMessage, setErrorMessage] = useState('');

  // Check entered value is number or not and convert into bignumber.
  const onChange = (event) => {
    const { value: newValue } = event.target;

    const normalizedValue = normalizeRawValue(newValue, decimals);
    if (!numberInProgressRegex.test(normalizedValue)) return;

    const parseValue = parseBigNumber(normalizedValue);
    if (parseValue?.isNaN()) return;

    // Check tokenAddress, receiverAddress and value is valid or not.
    setErrorMessage(erc20ValidationMessage({ ...props, value: normalizedValue }));

    onChangeValue && onChangeValue(normalizedValue);
  };

  const onKeyDown = () => {
    if (!disableSendOnEnter) handleEnterPress && handleEnterPress();
  };

  return (
    <>
      <input
        type="text"
        name="value"
        id="value"
        value={value}
        onChange={onChange}
        className={className}
        onKeyDown={onKeyDown}
        placeholder="0.00"
      />
      {errorMessage ? <p className={`sm:text-sm ${errorMessageClassName}`}>{errorMessage}</p> : ''}
    </>
  );
}

export default Erc20Input;
