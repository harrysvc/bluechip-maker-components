import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpenSeaAsset, Order, SortDirection } from '@typings/marketplace/opensea';
import { RequestStatus } from '@typings/request';
import { ResponseData, ResponseState } from '@typings/response';
import { Asset } from 'opensea-js/lib/types';

export type GetEventsParams = {
  asset_contract_address: string;
  token_id: string;
  event_type?: 'created' | 'successful' | 'cancelled' | 'bid_entered' | 'bid_withdrawn' | 'transfer' | 'approve';
  only_opensea?: boolean;
  auction_type?: string;
  offset?: number;
  limit?: string;
  occurred_before?: number;
  occurred_after?: number;
};

export type GetAssetOrdersParams = {
  asset_contract_address: string;
  payment_token_address?: string;
  maker?: string;
  taker?: string;
  owner?: string;
  is_english?: string;
  bundled?: boolean;
  include_bundled?: boolean;
  listed_after?: number;
  listed_before?: string;
  token_id: string;
  token_ids?: string[];
  side?: 0 | 1;
  sale_kind?: 0 | 1;
  limit?: number;
  offset?: number;
  order_by?: 'created_date' | 'eth_price';
  order_direction?: SortDirection;
};

export type GetAssetListParams = {
  owner?: string;
  token_ids?: string;
  asset_contract_address?: string;
  asset_contract_addresses?: string;
  order_by?: 'sale_date' | 'sale_count' | 'sale_price' | 'total_price';
  order_direction?: SortDirection;
  offset?: number;
  limit?: number;
  collection?: string;
  isLoadMore?: boolean;
};

export type SellAssetParams = {
  provider: any;
  asset: Asset;
  accountAddress: string;
  startAmount: number;
  endAmount?: number;
  quantity?: number;
  listingTime?: number;
  expirationTime?: number;
  waitForHighestBid?: boolean;
  englishAuctionReservePrice?: number;
  paymentTokenAddress?: string;
  extraBountyBasisPoints?: number;
  buyerAddress?: string;
  buyerEmail?: string;
};

export type BuyAssetParams = {
  provider: any;
  order: Order;
  accountAddress: string;
  recipientAddress?: string | undefined;
  referrerAddress?: string | undefined;
};

export type BidSaleParams = {
  provider: any;
  asset: Asset;
  accountAddress: string;
  startAmount: number;
  quantity?: number;
  expirationTime?: number;
  paymentTokenAddress?: string;
  referrerAddress?: string;
};

export type CancelSaleParams = {
  provider: any;
  order: Order;
  accountAddress: string;
};

export type MakeOffersParams = {
  provider: any;
  asset: Asset;
  accountAddress: string;
  startAmount: number;
  quantity?: number;
  expirationTime?: number;
  paymentTokenAddress?: string;
  referrerAddress?: string;
};

export type GetAssetParams = {
  tokenAddress: string;
  tokenId: string;
};

interface NftState {
  list: ResponseData<OpenSeaAsset[]>;
  orders: ResponseData<Order[]>;
  detail: ResponseData<OpenSeaAsset>;
  events: ResponseData<Order[]>;
  buy: ResponseState;
  offer: ResponseState;
  sell: ResponseState;
  bid: ResponseState;
  cancel: ResponseState;
}

const initialState: NftState = {
  list: {
    status: RequestStatus.Idle,
    data: [],
  },
  orders: {
    status: RequestStatus.Idle,
    data: [],
  },
  detail: {
    status: RequestStatus.Idle,
  },
  buy: { status: RequestStatus.Idle },
  offer: { status: RequestStatus.Idle },
  sell: { status: RequestStatus.Idle },
  events: {
    status: RequestStatus.Idle,
    data: [],
  },
  bid: { status: RequestStatus.Idle },
  cancel: { status: RequestStatus.Idle },
};

const getAssetRequest: CaseReducer<NftState, PayloadAction<GetAssetParams>> = (state) => {
  delete state.detail.error;

  state.detail.status = RequestStatus.Loading;
};

const getAssetSuccess: CaseReducer<NftState, PayloadAction<OpenSeaAsset>> = (state, { payload }) => {
  state.detail.status = RequestStatus.Success;
  state.detail.data = payload;
};

const getAssetFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.detail.status = RequestStatus.Failed;
  state.detail.error = payload;
};

const getEventsRequest: CaseReducer<NftState, PayloadAction<GetEventsParams>> = (state) => {
  delete state.events.error;
  state.events.status = RequestStatus.Loading;
};

const getEventsSuccess: CaseReducer<NftState, PayloadAction<Order[]>> = (state, { payload }) => {
  state.events.status = RequestStatus.Success;
  state.events.data = payload;
};

const getEventsFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.events.status = RequestStatus.Failed;
  state.events.error = payload;
};

const getAssetListRequest: CaseReducer<NftState, PayloadAction<GetAssetListParams>> = (state, { payload }) => {
  delete state.list.error;
  if (payload.isLoadMore) {
    state.list.loadingMore = true;
    state.list.status = RequestStatus.LoadingMore;
    return;
  }
  state.list.status = RequestStatus.Loading;
};

const getAssetListSuccess: CaseReducer<NftState, PayloadAction<OpenSeaAsset[]>> = (state, { payload }) => {
  if (state.list.loadingMore) {
    if (state.list.data) {
      state.list.data = [...state.list.data, ...payload];
      if (!payload.length) {
        state.list.loadedMore = true;
      }
    }
    state.list.status = RequestStatus.Success;
    return;
  }
  state.list.status = RequestStatus.Success;
  state.list.data = payload;
};

const getAssetListFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.list.status = RequestStatus.Failed;
  state.list.error = payload;
};

const getAssetOrdersRequest: CaseReducer<NftState, PayloadAction<GetAssetOrdersParams>> = (state) => {
  delete state.orders.error;
  state.orders.status = RequestStatus.Loading;
};

const getAssetOrdersSuccess: CaseReducer<NftState, PayloadAction<Order[]>> = (state, { payload }) => {
  state.orders.status = RequestStatus.Success;
  state.orders.data = payload;
};

const getAssetOrdersFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.orders.status = RequestStatus.Failed;
  state.orders.error = payload;
};

const buyAssetRequest: CaseReducer<NftState, PayloadAction<BuyAssetParams>> = (state) => {
  delete state.buy.error;
  state.buy.status = RequestStatus.Loading;
};

const buyAssetSuccess: CaseReducer<NftState> = (state) => {
  state.buy.status = RequestStatus.Success;
};

const buyAssetFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.buy.status = RequestStatus.Failed;
  state.buy.error = payload;
};

const makeOfferRequest: CaseReducer<NftState, PayloadAction<MakeOffersParams>> = (state) => {
  delete state.offer.error;
  state.offer.status = RequestStatus.Loading;
};

const makeOfferSuccess: CaseReducer<NftState> = (state) => {
  state.offer.status = RequestStatus.Success;
};

const makeOfferFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.offer.status = RequestStatus.Failed;
  state.offer.error = payload;
};

const sellAssetRequest: CaseReducer<NftState, PayloadAction<SellAssetParams>> = (state) => {
  delete state.sell.error;
  state.sell.status = RequestStatus.Loading;
};

const sellAssetSuccess: CaseReducer<NftState> = (state) => {
  state.sell.status = RequestStatus.Success;
};

const sellAssetFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.sell.status = RequestStatus.Failed;
  state.sell.error = payload;
};

const bidSaleRequest: CaseReducer<NftState, PayloadAction<BidSaleParams>> = (state) => {
  delete state.bid.error;
  state.bid.status = RequestStatus.Loading;
};

const bidSaleSuccess: CaseReducer<NftState> = (state) => {
  state.bid.status = RequestStatus.Success;
};

const bidSaleFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.bid.status = RequestStatus.Failed;
  state.bid.error = payload;
};

const cancelSaleRequest: CaseReducer<NftState, PayloadAction<CancelSaleParams>> = (state) => {
  delete state.cancel.error;
  state.cancel.status = RequestStatus.Loading;
};

const cancelSaleSuccess: CaseReducer<NftState> = (state) => {
  state.cancel.status = RequestStatus.Success;
};

const cancelSaleFailed: CaseReducer<NftState, PayloadAction<string>> = (state, { payload }) => {
  state.cancel.status = RequestStatus.Failed;
  state.cancel.error = payload;
};

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    getAssetListRequest,
    getAssetListSuccess,
    getAssetListFailed,

    getAssetOrdersRequest,
    getAssetOrdersSuccess,
    getAssetOrdersFailed,

    buyAssetRequest,
    buyAssetSuccess,
    buyAssetFailed,

    makeOfferRequest,
    makeOfferSuccess,
    makeOfferFailed,

    sellAssetRequest,
    sellAssetSuccess,
    sellAssetFailed,

    getAssetRequest,
    getAssetSuccess,
    getAssetFailed,

    getEventsRequest,
    getEventsSuccess,
    getEventsFailed,

    bidSaleRequest,
    bidSaleSuccess,
    bidSaleFailed,

    cancelSaleRequest,
    cancelSaleSuccess,
    cancelSaleFailed,
  },
});

export const nftReducer = nftSlice.reducer;
export const nftActions = nftSlice.actions;
export const { caseReducers } = nftSlice;
