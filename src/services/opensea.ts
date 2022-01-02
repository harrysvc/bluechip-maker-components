import { RPC_URLS } from '@constant/config/eth-chains';
import { OPENSEA_API_KEY } from '@constant/variables';
import { OpenSeaPort } from 'opensea-js';
import Web3 from 'web3';

declare let window: any;

export const SeaPort = (provider: any): OpenSeaPort => {
  let finalProvider;
  if (provider) {
    finalProvider = provider;
  } else if (window?.web3?.currentProvider) {
    finalProvider = Web3.givenProvider;
  } else {
    finalProvider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_NETWORK_NAME === 'main' ? RPC_URLS.MAINET : RPC_URLS.RINKEBY);
  }
  return new OpenSeaPort(finalProvider, {
    networkName: process.env.NEXT_PUBLIC_NETWORK_NAME as any,
    apiKey: OPENSEA_API_KEY,
  });
};

declare module 'opensea-js' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
}
