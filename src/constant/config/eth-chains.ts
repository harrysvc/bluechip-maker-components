import { ETH_CHAINS_ID, WALLET_CONNECTORS } from '@constant/enums/eth-chains';

export const CHAINS_EXPLORER = {
  [ETH_CHAINS_ID.MAINET]: 'https://etherscan.io/',
  [ETH_CHAINS_ID.RINKEBY]: 'https://rinkeby.etherscan.io/',
};

export const RPC_URLS = {
  MAINET: String(process.env.NEXT_PUBLIC_RPC_URL_MAINET),
  RINKEBY: String(process.env.NEXT_PUBLIC_RPC_URL_RINKEBY),
};

export const WALLET_CONFIG = [
  {
    name: 'Metamask',
    type: WALLET_CONNECTORS.injected,
    config: {
      chainId: [ETH_CHAINS_ID.MAINET, ETH_CHAINS_ID.RINKEBY],
    },
    iconName: 'metamask.png',
  },
  {
    name: 'Walletconnect',
    type: WALLET_CONNECTORS.walletconnect,
    config: {
      chainId: [ETH_CHAINS_ID.MAINET, ETH_CHAINS_ID.RINKEBY],
      rpc: { [ETH_CHAINS_ID.MAINET]: RPC_URLS.MAINET, [ETH_CHAINS_ID.RINKEBY]: RPC_URLS.RINKEBY },
    },
    iconName: 'wallet-connect.svg',
  },
  {
    name: 'Coinbase Wallet',
    type: WALLET_CONNECTORS.walletlink,
    config: {
      url: RPC_URLS.MAINET,
      chainId: ETH_CHAINS_ID.MAINET,
      appName: 'bluechip-maker-client',
      supportedChainIds: [ETH_CHAINS_ID.MAINET, ETH_CHAINS_ID.RINKEBY],
    },
    iconName: 'coinbase.svg',
  },
  {
    name: 'Portis',
    type: WALLET_CONNECTORS.portis,
    config: {
      dAppId: String(process.env.NEXT_PUBLIC_PORTIS_DAPP_ID),
      chainId: [ETH_CHAINS_ID.MAINET, ETH_CHAINS_ID.RINKEBY],
    },
    iconName: 'portis.png',
  },
  { name: 'Torus', type: WALLET_CONNECTORS.torus, config: { chainId: ETH_CHAINS_ID.MAINET }, iconName: 'torus.png' },
];
