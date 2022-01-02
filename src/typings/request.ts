export interface QueryParams {
  Page?: number;
  PageSize?: number;
  SearchTerm?: string;
}

export enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  LoadingMore = 'loading_more',
  Success = 'success',
  Failed = 'failed',
}
