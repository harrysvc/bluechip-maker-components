import { API_BASE_MAINNET, API_BASE_RINKEBY, OPENSEA_API_KEY } from '@constant/variables';
import { GetAssetListParams, GetAssetOrdersParams, GetAssetParams, GetEventsParams } from '@stores/slices/nft';
import Axios from 'axios';

const ConnectionInstance = Axios.create({
  timeout: 20000,
  baseURL: process.env.NEXT_PUBLIC_NETWORK_NAME === 'main' ? API_BASE_MAINNET : API_BASE_RINKEBY,
});

export const getOpenseaAssets = (params: GetAssetListParams) => ConnectionInstance.get(`/api/v1/assets`, { params });

export const getOpenseaAsset = (params: GetAssetParams) => ConnectionInstance.get(`/api/v1/asset/${params.tokenAddress}/${params.tokenId}`);

export const getOpenseaEvents = (params: GetEventsParams) =>
  ConnectionInstance.get(`/api/v1/events`, {
    params,
  });

export const getOpenseaOrders = (params: GetAssetOrdersParams) =>
  ConnectionInstance.get(`/wyvern/v1/orders`, { headers: { ...(OPENSEA_API_KEY ? { 'X-API-KEY': OPENSEA_API_KEY } : {}) }, params });
