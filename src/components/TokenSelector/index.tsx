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
import { EtherspotTransactionKit } from '@etherspot/transaction-kit';

// Types
import type { TokenSelectorProps } from '../../models/TokenSelector';

// Local
import Dropdown from './DropDown';

/**
 * @name TokenSelector
 * @description TokenSelector component provides a UI for list of tokens in dropdown.
   Shows tokens as per chainId. @param onSelect to easily we can import multiple tokens. 
   We can customize dropdown UI as per our expectation.
 * @param {TokenSelectorProps} props - The props for the component
 * @returns {React.ReactElement} The rendered component.
 */

const TokenSelector = (props: TokenSelectorProps) => {
  const { provider, chainId, dataApiKey, bundlerApiKey, ...rest } = props;

  return (
    <EtherspotTransactionKit 
        provider={provider} 
        chainId={chainId} 
        dataApiKey={dataApiKey} 
        bundlerApiKey={bundlerApiKey}>
      <Dropdown {...rest} />
    </EtherspotTransactionKit>
  );
};

export default TokenSelector;
