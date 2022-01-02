import { OpenSeaFungibleToken } from '@typings/marketplace/opensea';
import { DEFAULT_DECIMAL } from '@constant/variables';
import BigNumber from 'bignumber.js';

type Props = {
  amount: number;
  precision?: number;
  minVisiblePrecision?: number;
  maxVisiblePrecision?: number;
  exchangeRate: number;
};
export const calculatePrice = (price?: string) => {
  if (!price) {
    return '';
  }
  const result = Number(price).toFixed(2);
  return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const toUnitAmount = (baseAmount: BigNumber, tokenContract: OpenSeaFungibleToken | null = null): number => {
  const decimals = tokenContract?.decimals != null ? tokenContract.decimals : DEFAULT_DECIMAL;

  const amountBN = new BigNumber(baseAmount).toNumber();
  const decimalsBN = new BigNumber(10).pow(decimals).toNumber();
  const value = Number(amountBN / decimalsBN).toFixed(5);

  return Number(value) || 0;
};

export const getPrice = (price: BigNumber, paymentTokenContract?: OpenSeaFungibleToken | null): number => {
  return toUnitAmount(price, paymentTokenContract);
};

export const getUsdPriceString = ({ amount, exchangeRate }: Props): string => {
  const usdValue = amount * exchangeRate;

  return usdValue.toFixed(5);
};
