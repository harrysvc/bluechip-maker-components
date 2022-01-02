import { fork } from 'redux-saga/effects';
import common from './common';
import nft from './nft';

export default function* rootSaga() {
  yield fork(common);
  yield fork(nft);
}
