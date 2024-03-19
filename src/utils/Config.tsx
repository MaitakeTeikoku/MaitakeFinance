import {
  AccountBalance as AccountBalanceIcon,
  Search as SearchIcon,
  Info as InfoIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

// GASのURL
export const url = 'https://script.google.com/macros/s/AKfycbzibUOy-ke1yItvRJU8q1P_hcXea4AIb8ZQF0X0yNu36T6ttI42FFijKyiaDi5HILjV/exec';

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