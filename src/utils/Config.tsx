import {
  AccountBalance as AccountBalanceIcon,
  Search as SearchIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// GASのURL
export const url = 'https://script.google.com/macros/s/AKfycbxamTsaBdX4NptZhvl1M8P3-jwWFl9dBxWchT1-2Eg4MArcG6Zj0156_kvbOr2Y3yuk/exec';

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