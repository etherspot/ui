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
import type { DropdownProps } from '../../models/TokenSelector';

function Dropdown(props: DropdownProps) {
  const {
    onSelect,
    placeholder = SELECT_TOKEN,
    customDropdownIcon,
    debug,
    dropdownIconColor,
    dropdownHeight,
    dropdownWidth,
    checkMarkColor = 'blue',
    loadingText = LOADING,
    noTokenText = NO_TOKENS,
    dropdownContainerClassName,
    buttonClassName,
    dropdownClassName,
    dropdownButtonClassName,
    checkMarkIconClassName,
  } = props;

  /*
   * Gets Tokens from Transaction kit as per chainId.
   * Gets status(true/false) in isFetching
   */
  const { tokens, isFetching } = useAssets(debug);

  /*
   * Using this state to manage multiple token selection
   * setLastSelectedToken used for re-render tokenlist.
   */
  const [selected, setSelected] = useState<Token[]>([]);
  const [, setLastSelectedToken] = useState('');

  /*
   * Figure out whether the selected token is exists or not.
   * Note: If it exists then remove it from the list otherwise add the token to the list
   */
  const onSelectToken = (token: Token) => {
    const newTokenList = getUpdatedTokenList(token, selected);
    setLastSelectedToken(newTokenList.map((token) => token.name).join(','));
    setSelected(newTokenList);
    onSelect && onSelect(newTokenList);
  };

  /*
   * Shows selected tokens symbol otherwise show placeholder
   * Placeholder default value is `Select tokens...`
   * Note: You can change dropdown placeholder using `placeholder` param
   */
  const newPlaceHolder = isEmpty(selected) ? placeholder : selected.map((token) => token.symbol).join(', ');

  return (
    <div style={{ width: dropdownWidth }} className={`relative ${dropdownContainerClassName}`}>
      <Menu as="div" className="relative inline-block w-full text-left">
        <div className="w-full">
          <Menu.Button
            className={`flex w-full justify-between rounded-md bg-black/10 px-4 py-2 text-sm font-medium text-black hover:bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15 ${buttonClassName}`}
          >
            {newPlaceHolder}

            {/** We can customize the dropdown icon */}
            {customDropdownIcon ?? (
              <ChevronUpDownIcon
                style={{ color: dropdownIconColor }}
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
            className={`absolute right-0 mt-2  origin-top-right divide-y divide-gray-100 rounded-md w-full bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ${dropdownClassName}`}
          >
            <div className="px-1 py-1" style={{ height: dropdownHeight, overflowY: 'scroll' }}>
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
              {/** Shows tokens list in dropdown */}
              {tokens.map((token) => {
                const { name, logoURI, symbol } = token;

                // Check token is already selected or not.
                const isSelected = isTokenExists(token, selected);

                return (
                  <Menu.Item key={name + symbol}>
                    {({ active }) => (
                      <button
                        onClick={() => onSelectToken(token)}
                        className={`${
                          active ? 'bg-blue-400 text-white' : 'text-gray-900'
                        } flex w-full items-center rounded-md px-2 py-2 text-sm ${dropdownButtonClassName}`}
                      >
                        <CheckIcon
                          className={`h-5 w-5 mr-1 ${checkMarkIconClassName}`}
                          style={{ color: isSelected ? checkMarkColor : 'transparent' }}
                          aria-hidden="true"
                        />
                        {/*
                         * Display token image.
                         * Hides token image if URL is not available
                         */}
                        {logoURI && (
                          <img
                            src={logoURI}
                            alt={`${name} (${symbol}) image`}
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

export default Dropdown;
