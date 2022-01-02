import { BidSaleParams, CancelSaleParams } from './../slices/nft/index';
import { getOpenseaAsset, getOpenseaAssets, getOpenseaEvents, getOpenseaOrders } from '@api/opensea';
import { MAX_RETRY_COUNT, RETRY_TIME } from '@constant/variables';
import { PayloadAction } from '@reduxjs/toolkit';
import { SeaPort } from '@services/opensea';
import { AppState } from '@stores';
import { commonActions } from '@stores/slices/common';
import {
  BuyAssetParams,
  GetAssetListParams,
  GetAssetOrdersParams,
  GetAssetParams,
  GetEventsParams,
  MakeOffersParams,
  nftActions,
  SellAssetParams,
} from '@stores/slices/nft';
import { OpenSeaAsset, Order } from '@typings/marketplace/opensea';
import { AxiosResponse } from 'axios';
import { omit } from 'lodash';
import { OpenSeaPort, orderFromJSON } from 'opensea-js';
import { call, put, retry, select, takeLatest } from 'redux-saga/effects';

const handleGetEvents = function* ({ payload }: PayloadAction<GetEventsParams>) {
  try {
    const { data }: AxiosResponse<{ asset_events: Order[] }> = yield retry(MAX_RETRY_COUNT, RETRY_TIME, getOpenseaEvents, payload);
    yield put(nftActions.getEventsSuccess(data.asset_events));
  } catch (error) {
    yield put(commonActions.showMessage({ message: 'Somethings went wrong', type: 'error' }));
  }
};

const handleGetAsset = function* ({ payload }: PayloadAction<GetAssetParams>) {
  try {
    const { data }: AxiosResponse<OpenSeaAsset> = yield retry(MAX_RETRY_COUNT, RETRY_TIME, getOpenseaAsset, payload);
    yield put(nftActions.getAssetSuccess(data));
  } catch (error: any) {
    yield put(commonActions.showMessage({ message: 'Somethings went wrong', type: 'error' }));
    yield put(nftActions.getAssetFailed(error.message));
  }
};

const handleGetAssetList = function* ({ payload }: PayloadAction<GetAssetListParams>) {
  try {
    const { data }: AxiosResponse<{ assets: OpenSeaAsset[] }> = yield retry(
      MAX_RETRY_COUNT,
      RETRY_TIME,
      getOpenseaAssets,
      omit(payload, 'isLoadMore'),
    );
    yield put(nftActions.getAssetListSuccess(data.assets));
  } catch (error: any) {
    yield put(commonActions.showMessage({ message: 'Somethings went wrong', type: 'error' }));
    yield put(nftActions.getAssetListFailed(error.message));
  }
};

const handleGetAssetOrders = function* ({ payload }: PayloadAction<GetAssetOrdersParams>) {
  try {
    const { data }: AxiosResponse<{ orders: Order[] }> = yield retry(MAX_RETRY_COUNT, RETRY_TIME, getOpenseaOrders, payload);
    yield put(nftActions.getAssetOrdersSuccess(data.orders));
  } catch (error: any) {
    yield put(commonActions.showMessage({ message: 'Somethings went wrong', type: 'error' }));
    yield put(nftActions.getAssetFailed(error.message));
  }
};

const handleMakeOffer = function* ({ payload: { provider, ...payload } }: PayloadAction<MakeOffersParams>) {
  try {
    const seaport: OpenSeaPort = yield call(SeaPort, provider);
    yield call([seaport, seaport.createBuyOrder], payload);
    yield put(commonActions.showMessage({ message: 'Make offer successfully', type: 'success' }));
    yield put(nftActions.makeOfferSuccess());
    const {
      detail: { data },
    }: AppState['nft'] = yield select((state: AppState) => state.nft);
    if (data?.token_address && data?.token_id) {
      yield put(nftActions.getAssetRequest({ tokenAddress: data.token_address, tokenId: data.token_id }));
    }
  } catch (error: any) {
    yield put(commonActions.showMessage({ message: error.message, type: 'error' }));
    yield put(nftActions.makeOfferFailed(error.message));
  }
};

const handleSellAsset = function* ({ payload: { provider, ...payload } }: PayloadAction<SellAssetParams>) {
  try {
    const seaport: OpenSeaPort = yield call(SeaPort, provider);
    yield call([seaport, seaport.createSellOrder], payload);
    yield put(commonActions.showMessage({ message: 'Sell asset successfully', type: 'success' }));
    yield put(nftActions.sellAssetSuccess());
    const {
      detail: { data },
    }: AppState['nft'] = yield select((state: AppState) => state.nft);
    if (data?.token_address && data?.token_id) {
      yield put(nftActions.getAssetRequest({ tokenAddress: data.token_address, tokenId: data.token_id }));
    }
  } catch (error: any) {
    yield put(commonActions.showMessage({ message: error.message, type: 'error' }));
    yield put(nftActions.sellAssetFailed(error.message));
  }
};

const handleBidSale = function* ({ payload: { provider, ...payload } }: PayloadAction<BidSaleParams>) {
  try {
    const seaport: OpenSeaPort = yield call(SeaPort, provider);
    yield call([seaport, seaport.createBuyOrder], payload);
    yield put(commonActions.showMessage({ message: 'bid sale successfully', type: 'success' }));
    yield put(nftActions.bidSaleSuccess());
    const {
      detail: { data },
    }: AppState['nft'] = yield select((state: AppState) => state.nft);
    if (data?.token_address && data?.token_id) {
      yield put(nftActions.getAssetRequest({ tokenAddress: data.token_address, tokenId: data.token_id }));
    }
  } catch (error: any) {
    yield put(commonActions.showMessage({ message: error.message, type: 'error' }));
    yield put(nftActions.bidSaleFailed(error.message));
  }
};

const handleCancelSale = function* ({ payload }: PayloadAction<CancelSaleParams>) {
  try {
    const { provider, order, accountAddress } = payload;
    const seaport: OpenSeaPort = yield call(SeaPort, provider);
    yield call([seaport, seaport.cancelOrder], { order: orderFromJSON(order), accountAddress });
    yield put(commonActions.showMessage({ message: 'cancel sale successfully', type: 'success' }));
    yield put(nftActions.cancelSaleSuccess());
    const {
      detail: { data },
    }: AppState['nft'] = yield select((state: AppState) => state.nft);
    if (data?.token_address && data?.token_id) {
      yield put(nftActions.getAssetOrdersRequest({ asset_contract_address: data.token_address, token_id: data.token_id }));
    }
  } catch (error: any) {
    yield put(commonActions.showMessage({ message: error.message, type: 'error' }));
    yield put(nftActions.cancelSaleFailed(error.message));
  }
};

const handleBuyAsset = function* ({ payload }: PayloadAction<BuyAssetParams>) {
  try {
    const { provider, order, accountAddress } = payload;
    const seaport: OpenSeaPort = yield call(SeaPort, provider);
    yield call([seaport, seaport.fulfillOrder], { order: orderFromJSON(order), accountAddress });
    yield put(commonActions.showMessage({ message: 'Buy asset successfully', type: 'success' }));
    yield put(nftActions.buyAssetSuccess());
    const {
      detail: { data },
    }: AppState['nft'] = yield select((state: AppState) => state.nft);
    if (data?.token_address && data?.token_id) {
      yield put(nftActions.getAssetRequest({ tokenAddress: data.token_address, tokenId: data.token_id }));
    }
  } catch (error: any) {
    yield put(commonActions.showMessage({ message: error.message, type: 'error' }));
    yield put(nftActions.buyAssetFailed(error.message));
  }
};

export default function* nft() {
  yield takeLatest(nftActions.getAssetRequest.type, handleGetAsset);
  yield takeLatest(nftActions.getEventsRequest.type, handleGetEvents);
  yield takeLatest(nftActions.getAssetListRequest.type, handleGetAssetList);
  yield takeLatest(nftActions.getAssetOrdersRequest.type, handleGetAssetOrders);
  yield takeLatest(nftActions.buyAssetRequest.type, handleBuyAsset);
  yield takeLatest(nftActions.makeOfferRequest.type, handleMakeOffer);
  yield takeLatest(nftActions.sellAssetRequest.type, handleSellAsset);
  yield takeLatest(nftActions.bidSaleRequest.type, handleBidSale);
  yield takeLatest(nftActions.cancelSaleRequest.type, handleCancelSale);
}
