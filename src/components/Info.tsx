import {
  Grid, Typography, Divider, Button,
} from '@mui/material';
import {
  CurrencyExchange as CurrencyExchangeIcon,
  AccessTime as AccessTimeIcon,
  NavigateNext as NavigateNextIcon,
  TrendingUp as TrendingUpIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingDown as TrendingDownIcon,
  QueryStats as QueryStatsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';

function Info(): JSX.Element {
  const {
    config,
  } = useStateContext();

  return (
    <div>
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
          <CurrencyExchangeIcon color='primary' />
        </Grid>
        <Grid item xs={3}>
          {`為替`}
        </Grid>
        <Grid item xs={2}>
          &nbsp;
        </Grid>
        <Grid item xs={1}>
          <AccessTimeIcon color='inherit' fontSize='small' />
        </Grid>
        <Grid item xs={5}>
          <Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='caption'
            color='text.secondary'
          >
            {`${new Date(config.exchangeRateTime)?.toLocaleString('ja-JP')}`}
          </Typography>
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
              {`￥ ${config.exchangeRateYest}`}
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
            {`￥ ${config.exchangeRate}`}
          </Typography>
        </Grid>

        <Grid item xs={11}>
          <Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='body2'
            color='text.primary'
          >
            {`￥ ${config.exchangeRateChange} (${config.exchangeRateChangepct}%)`}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          {config.exchangeRateChange > 0 ? <TrendingUpIcon color='error' />
            : config.exchangeRateChange < 0 ? <TrendingDownIcon color='success' />
              : <TrendingFlatIcon color='inherit' />}
        </Grid>

        <Grid item xs={12}>
          &nbsp;
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => { window.open('https://www.google.com/finance/quote/USD-JPY') }}
            color='primary'
            variant='outlined'
            fullWidth
          >
            <QueryStatsIcon />
          </Button>
        </Grid>
      </Grid>
      <Divider />

      <Grid container
        sx={{
          textAlign: 'left',
          my: 2,
        }}
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
            <SettingsIcon color='primary' />
          </Grid>
          <Grid item xs={3}>
            {`設定`}
          </Grid>
          <Grid item xs={8}>
            &nbsp;
          </Grid>
        </Grid>

        <Grid item xs={8}>
          {`＄ 1 当たりの為替手数料： `}
        </Grid>
        <Grid item xs={4}>
          <Typography>
            {`￥ ${config.exchangeFee}`}
          </Typography>
        </Grid>

        <Grid item xs={8}>
          {`譲渡益にかかる税金： `}
        </Grid>
        <Grid item xs={4}>
          <Typography>
            {`${config.tax * 100}%`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Info;
