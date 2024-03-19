import { useState } from 'react';
import {
  Grid, Typography,
  Card, CardActionArea, CardContent,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  ExpandMore as ExpandMoreIcon,
  CreditCard as CreditCardIcon,
  CreditCardOff as CreditCardOffIcon,
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
  Remove as RemoveIcon,
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';
import StockDialog from '../components/StockDialog';
import AssetsDrawer from '../components/AssetsDrawer';
import RestartDialog from '../components/RestartDialog';

function Balance(): JSX.Element {
  const {
    config,
    userData,
    updateTime,
  } = useStateContext();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogIndex, setDialogIndex] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState<boolean>(false);

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

      <AssetsDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setRestartDialogOpen={setRestartDialogOpen}
      />

      <RestartDialog
        restartDialogOpen={restartDialogOpen}
        setRestartDialogOpen={setRestartDialogOpen}
      />
    </div>
  );
}

export default Balance;
