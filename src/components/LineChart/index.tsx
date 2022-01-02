import { theme } from '@theme';
import { Order } from '@typings/marketplace/opensea';
import React from 'react';
import { LineChart, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { DEFAULT_DECIMAL } from '@constant/variables';
import moment from 'moment';
import { Typography } from '@mui/material';

export type RLineChartProps = {
  data: Order[];
};

const RLineChart = ({ data, ...props }: RLineChartProps) => {
  const calculateValue = (totalPrice: string, decimals?: number) => {
    const decimalsValue = decimals ? decimals : DEFAULT_DECIMAL;
    const decimalsNumber = Math.pow(10, decimalsValue);
    const result = Number(totalPrice) / decimalsNumber;
    return result || 0;
  };

  const formatData = data
    ?.map((item) => {
      if (!item.created_date || !item.total_price) {
        return;
      }
      return {
        id: item.asset?.id,
        date: moment(new Date(item.created_date)).format('DD/MM'),
        value: calculateValue(item.total_price, item.payment_token?.decimals),
      };
    })
    .filter((item) => item !== undefined);

  return (
    <>
      {formatData.length > 0 ? (
        <ResponsiveContainer width="100%" aspect={5.0 / 2.0}>
          <LineChart {...props} data={formatData} height={600}>
            <Line type="monotone" dataKey="value" stroke={theme.palette.primary.main} />
            <CartesianGrid stroke={theme.palette.primary.main} />
            <XAxis dataKey="date" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="h4" color="primary">
          Have no data
        </Typography>
      )}
    </>
  );
};

export default RLineChart;
