import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, Typography, Divider, Button, IconButton,
} from '@mui/material';
import {
  Redeem as RedeemIcon,
  ArrowDownward as ArrowDownwardIcon,
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
  Remove as RemoveIcon,
  CreditCard as CreditCardIcon,
  AttachMoney as AttachMoneyIcon,
  CurrencyYen as CurrencyYenIcon,
  NavigateNext as NavigateNextIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  QueryStats as QueryStatsIcon,
  Close as CloseIcon,
  Output as OutputIcon,
  Input as InputIcon,
} from '@mui/icons-material';
import TransactionDialog from './TransactionDialog';

type Currency = 'JPY' | 'USD';
interface StockDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  ticker: string;
  tickerSymbol: string;
  stockName: string;
  stockNumber: number | undefined;
  cost: number | undefined;
  profit: number | undefined;
  netProfit: number | undefined;
  amount: number | undefined;
  stockCloseyestJpy: number | undefined;
  stockCloseyest: number | undefined;
  stockPriceJpy: number | undefined;
  stockPrice: number | undefined;
  stockChangeJpy: number | undefined;
  stockChange: number | undefined;
  stockChangepctJpy: number | undefined;
  stockChangepct: number | undefined;
  url: string;
  sellDisabled: boolean;
  buyDisabled: boolean;
}

function StockDialog({
  dialogOpen,
  setDialogOpen,
  ticker,
  tickerSymbol,
  stockName,
  stockNumber,
  cost,
  profit,
  netProfit,
  amount,
  stockCloseyestJpy,
  stockCloseyest,
  stockPriceJpy,
  stockPrice,
  stockChangeJpy,
  stockChange,
  stockChangepctJpy,
  stockChangepct,
  url,
  sellDisabled,
  buyDisabled,
}: StockDialogProps): JSX.Element {

  const [currency, setCurrency] = useState<Currency>('JPY');
  const [transactionDialogOpen, setTransactionDialogOpen] = useState<boolean>(false);
  const [isBuy, setIsBuy] = useState<boolean>(true);

  const clickCurrency = (): void => {
    if (currency === 'JPY') {
      setCurrency('USD');
    } else {
      setCurrency('JPY');
    }
  }

  const clickBuy = (): void => {
    setDialogOpen(false);
    setIsBuy(true);
    setTransactionDialogOpen(true);
  }

  const clickSell = (): void => {
    setDialogOpen(false);
    setIsBuy(false);
    setTransactionDialogOpen(true);
  }

  return (
    <div>
      <Dialog
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
      >
        <DialogTitle>
          <Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='h5'
            color='text.primary'
          >
            {`${tickerSymbol}`}
          </Typography>
          <Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='body2'
            color='text.secondary'
          >
            {` ${stockName}`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='h6'>
            {`${stockNumber?.toLocaleString() || 0}株`}
          </Typography>

          <Grid container
            sx={{ my: 2 }}
          >
            <Grid item container xs={12}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                my: 1,
              }}
            >
              <Grid item xs={1}>
                <RedeemIcon color='primary' />
              </Grid>
              <Grid item xs={3}>
                {`利益`}
              </Grid>
              <Grid item xs={8}>
                &nbsp;
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h6'>
                {`￥ ${cost?.toLocaleString() || 0}`}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <ArrowDownwardIcon />
            </Grid>
            <Grid item xs={10}>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {`￥ ${profit?.toLocaleString() || 0}`}
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='caption'
                color='text.secondary'
              >
                {` (￥ ${netProfit?.toLocaleString() || 0})`}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {(profit || 0) > 0 ? <KeyboardDoubleArrowUpIcon color='error' />
                : (profit || 0) < 0 ? <KeyboardDoubleArrowDownIcon color='success' />
                  : <RemoveIcon color='inherit' />}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h4'>
                {`￥ ${amount?.toLocaleString() || 0}`}
              </Typography>
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
                  {currency === 'JPY' ? `￥ ${stockCloseyestJpy?.toLocaleString()}`
                    : `＄ ${stockCloseyest?.toLocaleString()}`
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
                {currency === 'JPY' ? `￥ ${stockPriceJpy?.toLocaleString()}`
                  : `＄ ${stockPrice?.toLocaleString()}`
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
                {currency === 'JPY' ? `￥ ${stockChangeJpy?.toLocaleString()}`
                  : `＄ ${stockChange?.toLocaleString()}`
                }
                {currency === 'JPY' ? ` (${stockChangepctJpy?.toLocaleString()}%)`
                  : ` (${stockChangepct?.toLocaleString()}%)`
                }
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {(stockChangeJpy || 0) > 0 ? <TrendingUpIcon color='error' />
                : (stockChangeJpy || 0) < 0 ? <TrendingDownIcon color='success' />
                  : <TrendingFlatIcon color='inherit' />}
            </Grid>

            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => { window.open(`${url}`) }}
                color='primary'
                variant='outlined'
                fullWidth
              >
                <QueryStatsIcon />
              </Button>
            </Grid>
          </Grid>
          <Divider />
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'space-between' }}
        >
          <IconButton
            onClick={() => setDialogOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <Button
            onClick={clickSell}
            disabled={sellDisabled}
            endIcon={<OutputIcon />}
            variant='contained'
            fullWidth
          >
            {`売却`}
          </Button>
          <Button
            onClick={clickBuy}
            disabled={buyDisabled}
            endIcon={<InputIcon />}
            variant='contained'
            fullWidth
          >
            {`購入`}
          </Button>
        </DialogActions>
      </Dialog>

      <TransactionDialog
        transactionDialogOpen={transactionDialogOpen}
        setTransactionDialogOpen={setTransactionDialogOpen}
        setDialogOpen={setDialogOpen}
        ticker={ticker}
        stockPrice={(stockPrice || 0)}
        isBuy={isBuy}
      />
    </div>
  );
}

export default StockDialog;
