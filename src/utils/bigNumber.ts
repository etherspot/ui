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
import { BigNumber } from 'bignumber.js';

/**
 * This function can be invoke after user inputing consecutive charaters OR user pasting whole string.
 */
export function normalizeRawValue(input: string, decimals: number = 18): string {
  let result = input.replace(/,/g, '.').replace(/\s/g, '');

  const maxDecimals = decimals === 6 ? 4 : decimals > 15 ? 15 : decimals;

  // Trip leading and trailing spaces
  result = result.trim();

  // Trim leading zeros, but allow '0' & '0.'
  if (result.startsWith('0')) {
    result = result.replace(/^0+/, '');
    if (result === '') {
      result = '0';
    }
  }

  // Ensure 0 before decimal point
  if (result.startsWith('.')) {
    result = `0${result}`;
  }

  // Truncate too much decimal points
  if (maxDecimals != null && getDecimalPlaces(result) > maxDecimals) {
    result = BigNumber(result).toFixed(maxDecimals, BigNumber.ROUND_DOWN);
  }

  return result;
}

function getDecimalPlaces(input: string): number {
  const [, decimalPart] = input.split('.');
  return decimalPart?.length ?? 0;
}

export function parseBigNumber(input: string): BigNumber | null {
  if (!input) return null;
  return BigNumber(input);
}
