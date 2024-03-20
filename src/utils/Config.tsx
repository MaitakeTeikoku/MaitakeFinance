import {
  AccountBalance as AccountBalanceIcon,
  Search as SearchIcon,
  Info as InfoIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

// GASのURL
export const url = 'https://script.google.com/macros/s/AKfycbwf2FZN8_Cnz6_gXpRWMqbn11z0dyIEsoKGLkHIhTSWH_TgSiB-yQ77umPe6D6qiTQr/exec';

// タブの選択肢
export const tabOptions = [
  {
    value: 'balance',
    title: '資産',
    icon: <AccountBalanceIcon />
  }, {
    value: 'search',
    title: '検索',
    icon: <SearchIcon />
  }, {
    value: 'help',
    title: 'ヘルプ',
    icon: <HelpIcon />
  }, {
    value: 'info',
    title: '情報',
    icon: <InfoIcon />
  }
];

// 取引される金額を計算する関数
export const getCost = (
  isBuy: boolean,
  stockPrice: number,
  shareNumber: number,
  exchangeRate: number,
  exchangeFee: number
): number => {
  // 株数に応じた購入金額
  const stockPriceAmount = stockPrice * shareNumber;
  // 株価を日本円(JPY)に変換
  const stockPriceJpy = stockPriceAmount * exchangeRate;
  // 手数料
  const exchangeFeeAmount = stockPriceAmount * exchangeFee;

  if (isBuy) {
    // 口座残高から引かれる金額
    return Math.ceil(stockPriceJpy + exchangeFeeAmount);
  } else {
    // 口座残高に足される金額
    return Math.floor(stockPriceJpy - exchangeFeeAmount);
  }
}