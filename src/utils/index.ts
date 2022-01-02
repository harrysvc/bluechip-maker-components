import { CHAINS_EXPLORER } from '@constant/config/eth-chains';
import { ETH_CHAINS_ID } from '@constant/enums/eth-chains';

export const trimAccountAddress = (address: string) => {
  if (address?.length > 10) {
    return `${address?.slice(0, 5)}....${address?.slice(-5)}`;
  }
  return address;
};

export const getAddressOnExplorer = (address: string, chainId: keyof typeof CHAINS_EXPLORER) => {
  return `${CHAINS_EXPLORER[chainId]}/address/${address}` || '';
};
