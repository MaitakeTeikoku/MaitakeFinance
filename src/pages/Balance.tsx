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
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  DeleteForever as DeleteForeverIcon,
  Savings as SavingsIcon,
  Done as DoneIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';
import Requests from '../utils/Requests';
import StockDialog from '../components/StockDialog';

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
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState<boolean>(false);

  const clickRestart = async () => {
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
            {userData?.userName}
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
            {`${updateTime?.toLocaleString('ja-JP')}`}
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
                  {`￥ ${userData?.totalAssets?.toLocaleString()}`}
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
            {userData?.stocks?.map((stock: any, index: number) => {
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
                              {`${config?.stockOptions?.find((option: any) => option.ticker === stock.ticker)?.tickerSymbol}`}
                              <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='caption'
                                color='text.secondary'
                              >
                                {` ${config?.stockOptions?.find((option: any) => option.ticker === stock.ticker)?.stockName}`}
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
              <CreditCardOffIcon color='inherit' />
            </Grid>
            <Grid item xs={8}>
              {'過去に所有していた銘柄'}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Divider />
            {userData?.stocks?.map((stock: any, index: number) => {
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
                              {`${config?.stockOptions?.find((option: any) => option.ticker === stock.ticker)?.tickerSymbol}`}
                              <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='caption'
                                color='text.secondary'
                              >
                                {` ${config?.stockOptions?.find((option: any) => option.ticker === stock.ticker)?.stockName}`}
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

      <StockDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        tickerSymbol={config?.stockOptions?.find((option: any) => option.ticker === userData?.stocks?.[dialogIndex]?.ticker)?.tickerSymbol}
        stockName={config?.stockOptions?.find((option: any) => option.ticker === userData?.stocks?.[dialogIndex]?.ticker)?.stockName}
        stockNumber={userData?.stocks?.[dialogIndex]?.stockNumber}
        cost={userData?.stocks?.[dialogIndex]?.cost}
        profit={userData?.stocks?.[dialogIndex]?.profit}
        netProfit={userData?.stocks?.[dialogIndex]?.netProfit}
        amount={userData?.stocks?.[dialogIndex]?.amount}
        stockCloseyestJpy={userData?.stocks?.[dialogIndex]?.stockCloseyestJpy}
        stockCloseyest={userData?.stocks?.[dialogIndex]?.stockCloseyest}
        stockPriceJpy={userData?.stocks?.[dialogIndex]?.stockPriceJpy}
        stockPrice={userData?.stocks?.[dialogIndex]?.stockPrice}
        stockChangeJpy={userData?.stocks?.[dialogIndex]?.stockChangeJpy}
        stockChange={userData?.stocks?.[dialogIndex]?.stockChange}
        stockChangepctJpy={userData?.stocks?.[dialogIndex]?.stockChangepctJpy}
        stockChangepct={userData?.stocks?.[dialogIndex]?.stockChangepct}
        url={config?.stockOptions?.find((option: any) => option.ticker === userData?.stocks?.[dialogIndex]?.ticker)?.url}
        sellDisabled={userData?.stocks?.[dialogIndex]?.stockNumber <= 0}
        buyDisabled={false}
      />

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
                {`${new Date(userData?.date)?.toLocaleString('ja-JP')}`}
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
                  onClick={() => setRestartDialogOpen(true)}
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
                {`￥ ${config?.initialBalance?.toLocaleString()}`}
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
                {`￥ ${userData?.totalProfit?.toLocaleString()}`}
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='caption'
                color='text.secondary'
              >
                {` (￥ ${userData?.totalNetProfit?.toLocaleString()})`}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {userData?.totalProfit > 0 ? <KeyboardDoubleArrowUpIcon color='error' />
                : userData?.totalProfit < 0 ? <KeyboardDoubleArrowDownIcon color='success' />
                  : <RemoveIcon color='inherit' />}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h4'>
                {`￥ ${userData?.totalAssets?.toLocaleString()}`}
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
              {`￥ ${userData?.balance?.toLocaleString()}`}
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
              {`￥ ${userData?.totalAmount?.toLocaleString()}`}
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
        open={restartDialogOpen}
        onClose={() => setRestartDialogOpen(false)}
      >
        <DialogTitle>
          {`資産をリセットしますか？`}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'space-around' }}>
          <IconButton
            onClick={() => setRestartDialogOpen(false)}
          >
            <CloseIcon color='error' />
          </IconButton>
          <IconButton
            onClick={clickRestart}
          >
            <DoneIcon color='success' />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Balance;
