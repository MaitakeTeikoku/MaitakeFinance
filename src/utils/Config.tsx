import {
  AccountBalance as AccountBalanceIcon,
  Search as SearchIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// GASのURL
export const url = 'https://script.google.com/macros/s/AKfycbwQeJ4nsL5oPHm7hqZlL4XPr2Bd398xgKktW_AXgdyEWIEPFpKqj7jH8DzfZxQNAfis/exec';

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