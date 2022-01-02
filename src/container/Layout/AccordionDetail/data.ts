import moment from 'moment';

const now = new Date();
export const priceHistoryTimes = [
  {
    id: 1,
    label: 'All Time',
    value: 0,
  },
  {
    id: 2,
    label: 'Last 7 Days',
    value: moment().subtract(7, 'days').unix(),
  },
  {
    id: 3,
    label: 'Last 30 Days',
    value: moment().subtract(30, 'days').unix(),
  },
  {
    id: 4,
    label: 'last 3 months',
    value: moment().subtract(3, 'months').unix(),
  },
];
