import { ethers } from 'ethers';

export const isValidEthereumAddress = (address: string | undefined): boolean => {
  if (!address) return false;

  return ethers.utils.isAddress(address);

};

