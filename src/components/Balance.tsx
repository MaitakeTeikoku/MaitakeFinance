import { useState } from 'react';
import {
  Grid, Typography,
  Card, CardActionArea, CardContent,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Drawer, Container,
  Button, IconButton,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  ExpandMore as ExpandMoreIcon,
  CreditCard as CreditCardIcon,
  CreditCardOff as CreditCardOffIcon,
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
  Remove as RemoveIcon,
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
  ArrowDownward as ArrowDownwardIcon,
  NavigateNext as NavigateNextIcon,
  Redeem as RedeemIcon,
  CurrencyYen as CurrencyYenIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingDown as TrendingDownIcon,
  Output as OutputIcon,
  Input as InputIcon,
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  DeleteForever as DeleteForeverIcon,
  Savings as SavingsIcon,
  Done as DoneIcon,
  QueryStats as QueryStatsIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';
import Requests from '../utils/Requests';

type Currency = 'JPY' | 'USD';
interface BalanceProps {
  updateTime: Date | null;
  setUpdateTime: (updateTime: Date | null) => void;
}

function Balance({
  updateTime,
  setUpdateTime,
}: BalanceProps): JSX.Element {
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

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogIndex, setDialogIndex] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>('JPY');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [resetDialogOpen, setResetDialogOpen] = useState<boolean>(false);

  const clickReset = async () => {
    try {
      setIsRunning(true);

      setMessage('読み込み中...');
      setMessageSeverity('info');
      setMessageOpen(true);

      const paramsList: Record<string, string> = {
        action: 'restart',
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

  const clickStock = (index: number) => {
    setDialogIndex(index);
    setDialogOpen(true);
  }

  const clickCurrency = () => {
    if (currency === 'JPY') {
      setCurrency('USD');
    } else {
      setCurrency('JPY');
    }
  }

  return (
    <div>
      <Grid container
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Grid item xs={6}>
          <Typography variant='h6'>
            {userData.userName}
          </Typography>
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
            {updateTime !== null ? `${updateTime?.toLocaleString('ja-JP')}`
              : `-`
            }
          </Typography>
        </Grid>
      </Grid>

      <Card sx={{ mt: 1 }}>
        <CardActionArea
          onClick={() => setDrawerOpen(true)}
        >
          <CardContent>
            <Grid container
              alignItems='center'
            >
              <Grid item container xs={3}>
                <Grid item xs={12}>
                  <AccountBalanceIcon color='primary' />
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    {'資産'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h4'>
                  {`￥ ${userData.totalAssets?.toLocaleString()}`}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>


      <Accordion defaultExpanded sx={{ mt: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Grid container textAlign='left'>
            <Grid item xs={2}>
              <CreditCardIcon color='primary' />
            </Grid>
            <Grid item xs={8}>
              {'所有している銘柄'}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Divider />
            {userData.stocks?.map((stock: any, index: number) => {
              if (stock.stockNumber > 0) {
                return (
                  <div key={stock.ticker}>
                    <ListItemButton
                      onClick={() => clickStock(index)}
                    >
                      <ListItem>
                        <ListItemIcon>
                          {stock.profit > 0 ? <KeyboardDoubleArrowUpIcon color='error' />
                            : stock.profit < 0 ? <KeyboardDoubleArrowDownIcon color='success' />
                              : <RemoveIcon color='inherit' />}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <>
                              {`${config.stockOptions.find((option: any) => option.ticker === stock.ticker)?.tickerSymbol}`}
                              <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='caption'
                                color='text.secondary'
                              >
                                {` ${config.stockOptions.find((option: any) => option.ticker === stock.ticker)?.stockName}`}
                              </Typography>
                            </>
                          }
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                              >
                                {`${stock.stockNumber} 株`}
                              </Typography>
                              {` (￥ ${stock.profit?.toLocaleString()})`}
                            </>
                          }
                        />
                      </ListItem>
                    </ListItemButton>
                    <Divider />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Grid container textAlign='left'>
            <Grid item xs={2}>
              <CreditCardOffIcon color='secondary' />
            </Grid>
            <Grid item xs={8}>
              {'過去に所有していた銘柄'}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Divider />
            {userData.stocks?.map((stock: any, index: number) => {
              if (stock.stockNumber <= 0) {
                return (
                  <div key={stock.ticker}>
                    <ListItemButton
                      onClick={() => clickStock(index)}
                    >
                      <ListItem>
                        <ListItemIcon>
                          {stock.profit > 0 ? <KeyboardDoubleArrowUpIcon color='error' />
                            : stock.profit < 0 ? <KeyboardDoubleArrowDownIcon color='success' />
                              : <RemoveIcon color='inherit' />}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <>
                              {`${config.stockOptions.find((option: any) => option.ticker === stock.ticker)?.tickerSymbol}`}
                              <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='caption'
                                color='text.secondary'
                              >
                                {` ${config.stockOptions.find((option: any) => option.ticker === stock.ticker)?.stockName}`}
                              </Typography>
                            </>
                          }
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                              >
                                {`${stock.stockNumber} 株`}
                              </Typography>
                              {` (￥ ${stock.profit?.toLocaleString()})`}
                            </>
                          }
                        />
                      </ListItem>
                    </ListItemButton>
                    <Divider />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </List>
        </AccordionDetails>
      </Accordion>

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
            {`${config.stockOptions.find((option: any) => option.ticker === userData.stocks?.[dialogIndex]?.ticker)?.tickerSymbol}`}
          </Typography>
          <Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='body2'
            color='text.secondary'
          >
            {` ${config.stockOptions.find((option: any) => option.ticker === userData.stocks?.[dialogIndex]?.ticker)?.stockName}`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='h6'>
            {`${userData.stocks?.[dialogIndex]?.stockNumber?.toLocaleString()}株`}
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
                {`￥ ${userData.stocks?.[dialogIndex]?.cost?.toLocaleString()}`}
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
                {`￥ ${userData.stocks?.[dialogIndex]?.profit?.toLocaleString()}`}
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='caption'
                color='text.secondary'
              >
                {` (￥ ${userData.stocks?.[dialogIndex]?.netProfit?.toLocaleString()})`}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {userData.stocks?.[dialogIndex]?.profit > 0 ? <KeyboardDoubleArrowUpIcon color='error' />
                : userData.stocks?.[dialogIndex]?.profit < 0 ? <KeyboardDoubleArrowDownIcon color='success' />
                  : <RemoveIcon color='inherit' />}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h4'>
                {`￥ ${userData.stocks?.[dialogIndex]?.amount?.toLocaleString()}`}
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
                  {currency === 'JPY' ? `￥ ${userData.stocks?.[dialogIndex]?.stockCloseyestJpy?.toLocaleString()}`
                    : `＄ ${userData.stocks?.[dialogIndex]?.stockCloseyest?.toLocaleString()}`
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
                {currency === 'JPY' ? `￥ ${userData.stocks?.[dialogIndex]?.stockPriceJpy?.toLocaleString()}`
                  : `＄ ${userData.stocks?.[dialogIndex]?.stockPrice?.toLocaleString()}`
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
                {currency === 'JPY' ? `￥ ${userData.stocks?.[dialogIndex]?.stockChangeJpy?.toLocaleString()}`
                  : `＄ ${userData.stocks?.[dialogIndex]?.stockChange?.toLocaleString()}`
                }
                {currency === 'JPY' ? ` (${userData.stocks?.[dialogIndex]?.stockChangepctJpy.toLocaleString()}%)`
                  : ` (${userData.stocks?.[dialogIndex]?.stockChangepct?.toLocaleString()}%)`
                }
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {userData.stocks?.[dialogIndex]?.stockChangeJpy > 0 ? <TrendingUpIcon color='error' />
                : userData.stocks?.[dialogIndex]?.stockChangeJpy < 0 ? <TrendingDownIcon color='success' />
                  : <TrendingFlatIcon color='inherit' />}
            </Grid>

            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => { window.open(`${config.stockOptions.find((option: any) => option.ticker === userData.stocks?.[dialogIndex]?.ticker)?.url}`) }}
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
            disabled={userData.stocks?.[dialogIndex]?.stockNumber <= 0}
            endIcon={<OutputIcon />}
            variant='contained'
            fullWidth

          >
            {`売却`}
          </Button>
          <Button
            endIcon={<InputIcon />}
            variant='contained'
            fullWidth
          >
            {`購入`}
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer
        anchor={'top'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Container
          maxWidth='xs'
          sx={{ my: 1 }}
        >
          <Grid container
            sx={{ my: 2 }}
          >
            <Grid item container xs={12}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Grid item xs={1}>
                <AccessTimeIcon color='primary' />
              </Grid>
              <Grid item xs={3}>
                {`最終取引`}
              </Grid>
              <Grid item xs={8}>
                {`${new Date(userData.date)?.toLocaleString('ja-JP')}`}
              </Grid>
            </Grid>
          </Grid>
          <Divider />

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
                <AccountBalanceIcon color='primary' />
              </Grid>
              <Grid item xs={3}>
                {`資産`}
              </Grid>
              <Grid item xs={4}>
                &nbsp;
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => setResetDialogOpen(true)}
                  variant='outlined'
                  size='small'
                  color='secondary'
                >
                  <DeleteForeverIcon />
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body1'>
                {`￥ ${config.initialBalance?.toLocaleString()}`}
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
                {`￥ ${userData.totalProfit?.toLocaleString()}`}
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='caption'
                color='text.secondary'
              >
                {` (￥ ${userData.totalNetProfit?.toLocaleString()})`}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {userData.totalProfit > 0 ? <KeyboardDoubleArrowUpIcon color='error' />
                : userData.totalProfit < 0 ? <KeyboardDoubleArrowDownIcon color='success' />
                  : <RemoveIcon color='inherit' />}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h4'>
                {`￥ ${userData.totalAssets?.toLocaleString()}`}
              </Typography>
            </Grid>
          </Grid>

          <Grid container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              my: 1,
            }}
          >
            <Grid item xs={1}>
              &nbsp;
            </Grid>
            <Grid item xs={1}>
              <SavingsIcon color='primary' />
            </Grid>
            <Grid item xs={3}>
              {`貯金`}
            </Grid>
            <Grid item xs={7}>
              {`￥ ${userData.balance?.toLocaleString()}`}
            </Grid>
          </Grid>

          <Grid container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              my: 1,
            }}
          >
            <Grid item xs={1}>
              &nbsp;
            </Grid>
            <Grid item xs={1}>
              <CreditCardIcon color='primary' />
            </Grid>
            <Grid item xs={3}>
              {`株`}
            </Grid>
            <Grid item xs={7}>
              {`￥ ${userData.totalAmount?.toLocaleString()}`}
            </Grid>
          </Grid>
        </Container>

        <IconButton
          onClick={() => setDrawerOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </Drawer>

      <Dialog
        open={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
      >
        <DialogTitle>
          {`資産をリセットしますか？`}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'space-around' }}>
          <IconButton
            onClick={() => setResetDialogOpen(false)}
          >
            <CloseIcon color='error' />
          </IconButton>
          <IconButton
            onClick={clickReset}
          >
            <DoneIcon color='success' />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Balance;
