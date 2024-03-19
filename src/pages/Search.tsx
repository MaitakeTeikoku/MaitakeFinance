import { useState } from 'react';
import {
  Grid, Typography,
  TextField, Switch,
  List, ListItem, ListItemButton, ListItemText, Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';
import Requests from '../utils/Requests';
import StockDialog from '../components/StockDialog';

function Search(): JSX.Element {
  const {
    setMessage,
    setMessageOpen,
    setMessageSeverity,
    setIsRunning,
    config,
    setConfig,
    userData,
    setUserData,
    setUpdateTime,
  } = useStateContext();
  const requests = Requests();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [searchedTicker, setSearchedTicker] = useState<string>('');
  const [searchWord, setSearchWord] = useState<string>('');
  const [isOnlyJapan, setIsOnlyJapan] = useState<boolean>(false);

  const clickSearch = async (ticker: string) => {
    if (ticker === searchedTicker) {
      setDialogOpen(true);
      return;
    }

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
        setSearchedTicker(ticker);
        setDialogOpen(true);
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

  const filteredStockOptions = config?.stockOptions
    ?.filter((stock: any) => stock.stockName !== '#N/A')
    .filter((stock: any) => {
      if (!searchWord) {
        return true;
      }
      return (
        stock.ticker.toLowerCase().includes(searchWord.toLowerCase()) ||
        stock.stockName.toLowerCase().includes(searchWord.toLowerCase()) ||
        stock.stockNameJa.toLowerCase().includes(searchWord.toLowerCase())
      );
    })
    .filter((stock: any) => !isOnlyJapan || stock.japan);

  return (
    <div>
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
            fullWidth
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
        <Typography sx={{
          textAlign: 'end',
          mb: 1, mr: 2,
        }}>
          {`${filteredStockOptions.length} 件`}
        </Typography>
        <Divider />
        {filteredStockOptions.map((stock: any) => (
          <div key={stock.ticker}>
            <ListItemButton
              onClick={() => clickSearch(stock.ticker)}
              sx={{
                bgcolor: stock.ticker === searchedTicker ? 'primary.light' : 'inherit',
              }}
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

      <StockDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        tickerSymbol={config?.stockOptions?.find((option: any) => option.ticker === userData?.ticker)?.tickerSymbol}
        stockName={config?.stockOptions?.find((option: any) => option.ticker === userData?.ticker)?.stockName}
        stockNumber={userData?.stocks?.find((option: any) => option.ticker === userData?.ticker)?.stockNumber}
        cost={userData?.stocks?.find((option: any) => option.ticker === userData?.ticker)?.cost}
        profit={userData?.stocks?.find((option: any) => option.ticker === userData?.ticker)?.profit}
        netProfit={userData?.stocks?.find((option: any) => option.ticker === userData?.ticker)?.netProfit}
        amount={userData?.stocks?.find((option: any) => option.ticker === userData?.ticker)?.amount}
        stockCloseyestJpy={userData?.stockCloseyestJpy}
        stockCloseyest={userData?.stockCloseyest}
        stockPriceJpy={userData?.stockPriceJpy}
        stockPrice={userData?.stockPrice}
        stockChangeJpy={userData?.stockChangeJpy}
        stockChange={userData?.stockChange}
        stockChangepctJpy={userData?.stockChangepctJpy}
        stockChangepct={userData?.stockChangepct}
        url={config?.stockOptions?.find((option: any) => option.ticker === userData?.ticker)?.url}
        sellDisabled={
          userData?.stocks?.find((stock: any) => stock.ticker === userData?.ticker)?.stockNumber <= 0
          || !userData?.stocks?.find((stock: any) => stock.ticker === userData?.ticker)
          || !userData?.stockPriceJpy
        }
        buyDisabled={!userData?.stockPriceJpy}
      />
    </div>
  );
}

export default Search;
