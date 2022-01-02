import { RequestStatus } from './request';

export interface ResponseState {
  status?: RequestStatus;
  error?: string;
  loadingMore?: boolean;
  loadedMore?: boolean;
}

export interface ResponseData<T> extends ResponseState {
  data?: T;
}
