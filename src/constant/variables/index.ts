import { WyvernProtocol } from 'wyvern-js';

export const API_BASE_MAINNET = 'https://api.opensea.io/api/v1';
export const API_BASE_RINKEBY = 'https://rinkeby-api.opensea.io';
export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEFAULT_DECIMAL = 18;
export const MAX_LIMIT_NUMBER = 50;
export const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_NETWORK_NAME === 'main' ? process.env.NEXT_PUBLIC_OPENSEA_API_KEY : undefined;
export const NULL_ADDRESS = WyvernProtocol.NULL_ADDRESS;
export const RETRY_TIME = 2500;
export const MAX_RETRY_COUNT = 4;
export const LINK_OPENSEA_SWAP = 'https://app.uniswap.org/#/swap';
