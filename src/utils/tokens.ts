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

// Type
import type { Token } from '../models/Assets';

export const isSameToken = (a: Token, b: Token): boolean =>
  a.symbol === b.symbol && a?.address?.toLowerCase() === b?.address?.toLowerCase();

export const isTokenExists = (token: Token, tokenList: Token[]): boolean =>
  tokenList.some((tokenA) => isSameToken(tokenA, token));

export const getUpdatedTokenList = (token: Token, tokenList: Token[]): Token[] => {
  const tokenIndex = tokenList?.findIndex((tokenA) => isSameToken(tokenA, token));

  if (tokenIndex !== -1) {
    tokenList.splice(tokenIndex, 1);
    return tokenList;
  }

  return [...tokenList, token];
};
