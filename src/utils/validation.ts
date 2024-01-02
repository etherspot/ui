import { ethers } from 'ethers';

export const isValidEthereumAddress = (address: string | undefined): boolean => {
  if (!address) return false;
  
  try {
    return ethers.utils.isAddress(address);
  } catch (e) {
    return false;
  }
};
