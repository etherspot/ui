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

import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { isEmpty } from 'lodash';

// Hooks
import { useAssets } from '../../hooks/useAssets';

// Utils
import { getUpdatedTokenList, isTokenExists } from '../../utils/tokens';

// Constants
import { LOADING, NO_TOKENS, SELECT_TOKEN } from '../../constants/TokenSelector';

// Types
import type { Token } from '../../models/Assets';
import type { TokenSelectorProps } from '../../models/TokenSelector';

function DropDown(props: TokenSelectorProps) {
  const {
    onSelect,
    placeholder = SELECT_TOKEN,
    customDropDownIcon,
    dropDownIconColor,
    style,
    buttonStyle,
    dropDownStyle,
    dropDownButtonStyle = { textAlign: 'left', fontSize: '12px' },
    dropDownHeight = '200px',
    dropDownWidth = '300px',
    checkMarkColor = 'blue',
    checkMarkIconStyle = { width: '16px' },
    loadingText = LOADING,
    noTokenText = NO_TOKENS,
  } = props;

  const { tokens, isFetching } = useAssets();

  const [selected, setSelected] = useState<Token[]>([]);
  const [, setLastSelectedToken] = useState('');

  const onSelectToken = (token: Token) => {
    const newTokenList = getUpdatedTokenList(token, selected);
    setLastSelectedToken(newTokenList.map((token) => token.name).join(','));
    setSelected(newTokenList);
    onSelect && onSelect(newTokenList);
  };

  const newPlaceHolder = isEmpty(selected) ? placeholder : selected.map((token) => token.symbol).join(', ');

  return (
    <div style={{ width: dropDownWidth, ...style }} className="relative">
      <Menu as="div" className="relative inline-block w-full text-left">
        <div className="w-full">
          <Menu.Button
            style={buttonStyle}
            className="flex w-full justify-between rounded-md bg-black/10 px-4 py-2 text-sm font-medium text-black hover:bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
          >
            {newPlaceHolder}
            {customDropDownIcon ?? (
              <ChevronUpDownIcon
                style={{ color: dropDownIconColor }}
                className="-mr-1 ml-2 h-5 w-5 text-gray-900"
                aria-hidden="true"
              />
            )}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            style={dropDownStyle}
            className="absolute right-0 mt-2  origin-top-right divide-y divide-gray-100 rounded-md w-full bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div className="px-1 py-1" style={{ height: dropDownHeight, overflowY: 'scroll' }}>
              {isFetching && (
                <div className="w-full h-full flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <text>{loadingText}</text>
                </div>
              )}
              {!isFetching && isEmpty(tokens) && (
                <div className="w-full h-full flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <text>{noTokenText}</text>
                </div>
              )}
              {tokens.map((token) => {
                const { name, logoURI, symbol } = token;
                const isSelected = isTokenExists(token, selected);

                return (
                  <Menu.Item key={name + symbol}>
                    {({ active }) => (
                      <button
                        onClick={() => onSelectToken(token)}
                        style={{ ...dropDownButtonStyle }}
                        className={`${
                          active ? 'bg-blue-400 text-white' : 'text-gray-900'
                        } flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <CheckIcon
                          className="h-5 w-5 mr-1"
                          style={{ color: isSelected ? checkMarkColor : 'transparent', ...checkMarkIconStyle }}
                          aria-hidden="true"
                        />
                        {logoURI && (
                          <img
                            src={logoURI}
                            alt="new"
                            aria-hidden="true"
                            className="mr-2 h-5 w-5"
                            style={{ borderRadius: '50%' }}
                          />
                        )}
                        {name} ({symbol})
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default DropDown;
