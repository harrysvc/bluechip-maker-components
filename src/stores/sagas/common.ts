import { commonActions } from '@stores/slices/common';
import { takeLatest } from 'redux-saga/effects';

const handleInit = function* () {
  console.log('Saga ran');
};

export default function* () {}
