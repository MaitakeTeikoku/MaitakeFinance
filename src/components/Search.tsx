import { useState } from 'react';
import {
  Grid, Skeleton, Button,

  TextField, Switch,
  List, ListItem, ListItemButton, ListItemText, Divider,
  Typography,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AttachMoney as AttachMoneyIcon,
  CurrencyYen as CurrencyYenIcon,
  NavigateNext as NavigateNextIcon,
  TrendingUp as TrendingUpIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingDown as TrendingDownIcon,
  QueryStats as QueryStatsIcon,
  Output as OutputIcon,
  Input as InputIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';
import Requests from '../utils/Requests';

type Currency = 'JPY' | 'USD';
interface SearchProps {
  setUpdateTime: (updateTime: Date | null) => void;
}

function Search({
  setUpdateTime,
}: SearchProps): JSX.Element {
  const {
    setMessage,
    setMessageOpen,
    setMessageSeverity,
    setIsRunning,
    config,
    setConfig,
    userData,
    setUserData,
  } = useStateContext();
  const requests = Requests();

  const [currency, setCurrency] = useState<Currency>('JPY');
  const [searchWord, setSearchWord] = useState<string>('');
  const [isOnlyJapan, setIsOnlyJapan] = useState<boolean>(false);

  const clickSearch = async (ticker: string) => {
    try {
      setIsRunning(true);

      setMessage('読み込み中...');
      setMessageSeverity('info');
      setMessageOpen(true);

      const paramsList: Record<string, string> = {
        action: 'search',
        ticker: ticker,
      };
      const returnValue = await requests(paramsList);

      if (returnValue.result) {
        setConfig(returnValue.data.config);
        setUserData(returnValue.data.userData);
        setUpdateTime(new Date());
      } else {
        setMessage('サインインしないと結果が保存されません。');
        setMessageSeverity('warning');
        setMessageOpen(true);
        //window.location.href = 'https://MaitakeTeikoku.github.io/MaitakeAuth';
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
        setMessageSeverity('error');
        setMessageOpen(true);
      } else {
        setMessage('予期しないエラー');
        setMessageSeverity('error');
        setMessageOpen(true);
      }
      //window.location.href = 'https://MaitakeTeikoku.github.io/MaitakeAuth';
    } finally {
      setIsRunning(false);
    }
  };

  const clickCurrency = () => {
    if (currency === 'JPY') {
      setCurrency('USD');
    } else {
      setCurrency('JPY');
    }
  }

  return (
    <div>
      {userData.stockPriceJpy ?
        <div>
          <Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='h5'
            color='text.primary'
          >
            {`${config.stockOptions.find((option: any) => option.ticker === userData.ticker)?.tickerSymbol}`}
          </Typography>
          <Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='body2'
            color='text.secondary'
          >
            {` ${config.stockOptions.find((option: any) => option.ticker === userData.ticker)?.stockName}`}
          </Typography>

          <Grid container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              my: 2,
            }}
          >
            <Grid item xs={1}>
              <CreditCardIcon color='primary' />
            </Grid>
            <Grid item xs={3}>
              {`株価`}
            </Grid>
            <Grid item xs={4}>
              &nbsp;
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={clickCurrency}
                variant='outlined'
                size='small'
                color={currency === 'JPY' ? 'secondary'
                  : 'primary'
                }
              >
                {currency === 'JPY' ? <AttachMoneyIcon />
                  : <CurrencyYenIcon />
                }
              </Button>
            </Grid>

            <Grid item container xs={4}>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid item xs={9}>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='caption'
                  color='text.secondary'
                >
                  {currency === 'JPY' ? `￥ ${userData?.stockCloseyestJpy?.toLocaleString()}`
                    : `＄ ${userData?.stockCloseyest?.toLocaleString()}`
                  }
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <NavigateNextIcon />
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='h5'
                color='text.primary'
              >
                {currency === 'JPY' ? `￥ ${userData?.stockPriceJpy?.toLocaleString()}`
                  : `＄ ${userData?.stockPrice?.toLocaleString()}`
                }
              </Typography>
            </Grid>

            <Grid item xs={11}>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {currency === 'JPY' ? `￥ ${userData?.stockChangeJpy?.toLocaleString()}`
                  : `＄ ${userData?.stockChange?.toLocaleString()}`
                }
                {currency === 'JPY' ? ` (${userData?.stockChangepctJpy?.toLocaleString()}%)`
                  : ` (${userData?.stockChangepct?.toLocaleString()}%)`
                }
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {userData?.stockChangeJpy > 0 ? <TrendingUpIcon color='error' />
                : userData?.stockChangeJpy < 0 ? <TrendingDownIcon color='success' />
                  : <TrendingFlatIcon color='inherit' />}
            </Grid>

            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => { window.open(`${config.stockOptions.find((option: any) => option.ticker === userData?.ticker)?.url}`) }}
                color='primary'
                variant='outlined'
                fullWidth
              >
                <QueryStatsIcon />
              </Button>
            </Grid>
          </Grid>
        </div>
        :
        <Typography variant='h1'>
          <Skeleton />
        </Typography>
      }

      <Grid container
        spacing={1}
        sx={{
          justifyContent: 'space-between',
          my: 2,
        }}
      >
        <Grid item xs={6}>
          <Button
            disabled={userData.stocks.find((stock: any) => stock.ticker === userData?.ticker)?.stockNumber <= 0
              || !userData.stockPriceJpy
            }
            endIcon={<OutputIcon />}
            variant='contained'
            fullWidth

          >
            {`売却`}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            disabled={!userData.stockPriceJpy}
            endIcon={<InputIcon />}
            variant='contained'
            fullWidth
          >
            {`購入`}
          </Button>
        </Grid>
      </Grid>
      <Divider />

      <Grid container
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          my: 2,
        }}
      >
        <Grid item xs={9}>
          <TextField
            label='キーワード'
            value={searchWord}
            onChange={(event) => setSearchWord(event.target.value)}
          />
        </Grid>
        <Grid item container xs={3}>
          <Grid item xs={12}>
            <Typography variant='caption'>
              {'日本のみ'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Switch
              checked={isOnlyJapan}
              onChange={(event) => setIsOnlyJapan(event.target.checked)}
            />
          </Grid>
        </Grid>
      </Grid>

      <List>
        <Divider />
        {config.stockOptions?.filter((stock: any) => {
          if (!searchWord) {
            return true;
          }
          return (
            stock.ticker.toLowerCase().includes(searchWord.toLowerCase()) ||
            stock.stockName.toLowerCase().includes(searchWord.toLowerCase()) ||
            stock.stockNameJa.toLowerCase().includes(searchWord.toLowerCase())
          );
        }).filter((stock: any) => !isOnlyJapan || stock.japan).map((stock: any) => (
          <div key={stock.ticker}>
            <ListItemButton
              onClick={() => clickSearch(stock.ticker)}
            >
              <ListItem
                secondaryAction={<SearchIcon />}
              >
                <ListItemText
                  primary={
                    <>
                      {`${stock.tickerSymbol}`}
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='caption'
                        color='text.secondary'
                      >
                        {` ${stock.stockName}`}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {`${stock.stockNameJa}`}
                    </Typography>
                  }
                />
              </ListItem>
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default Search;
