import { combineReducers } from '@reduxjs/toolkit';
import { commonReducer } from '@stores/slices/common';
import { nftReducer } from '@stores/slices/nft';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  common: persistReducer({ key: 'common', storage, whitelist: ['message'] }, commonReducer),
  nft: nftReducer,
});

export default rootReducer;
