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

import React, { useState } from 'react';

// Utils
import { normalizeRawValue, parseBigNumber } from '../../utils/bigNumber';
import { numberInProgressRegex } from '../../utils/common';
import { nativeTokenValidationMessage } from '../../utils/validation';

// Types
import type { SendNativeTokenInputProps, SendNativeTokenTransactionProps } from '../../models/Transactions';

/**
 * @name TokenInput
 * @description: Use of NativeTokenInput as token value input.
 * @param {SendNativeTokenInputProps & SendNativeTokenTransactionProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */
function TokenInput(props: SendNativeTokenInputProps & SendNativeTokenTransactionProps) {
  const { value, errorMessageClassName, onChangeValue, decimals, className, disableSendOnEnter, handleEnterPress } =
    props;
  const [errorMessage, setErrorMessage] = useState('');

  // Function is called when the input value changes 
  const onChange = (event) => {
    const { value: newValue } = event.target;

    // Normalize the value and check if it is a valid number
    const normalizedValue = normalizeRawValue(newValue, decimals);
    if (!numberInProgressRegex.test(normalizedValue)) return;

    // Parse the normalized value into a BigNumber
    const parseValue = parseBigNumber(normalizedValue);
    if (parseValue?.isNaN()) return;

    // Check receiverAddress and value is valid or not.
    setErrorMessage(nativeTokenValidationMessage({ ...props, value: normalizedValue }));

    // Call the onChangeValue prop with the normalized value
    onChangeValue && onChangeValue(normalizedValue);
    
  };

  // Function is called when a key is pressed in the input field
  const onKeyDown = () => {
    // If disableSendOnEnter is false, call the handleEnterPress prop
    if (!disableSendOnEnter) handleEnterPress && handleEnterPress();
  };

  return (
    <>
      <input
        type="text"
        name="value"
        id={`etherspot-ui-token-${Math.random().toString()}`}
        value={value}
        onChange={onChange}
        className={className}
        onKeyDown={onKeyDown}
        placeholder="0"
      />
      <p className={errorMessageClassName}>{errorMessage}</p>
    </>
  );
}

export default TokenInput;
