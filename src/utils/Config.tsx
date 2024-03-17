import {
  AccountBalance as AccountBalanceIcon,
  Search as SearchIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// GASのURL
export const url = 'https://script.google.com/macros/s/AKfycbwqU6B_uino6l7BAcntB9Ua7qCoeicIPeoKIXRWoJkcPo_x9P4y9tu8jdKfZMMfm7mL/exec';

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
    value: 'info',
    title: '情報',
    icon: <InfoIcon />
  }
];