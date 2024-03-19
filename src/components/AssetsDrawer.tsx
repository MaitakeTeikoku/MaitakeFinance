import {
  Drawer, Container, Grid, Typography, Divider, Button, IconButton,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  AccountBalance as AccountBalanceIcon,
  DeleteForever as DeleteForeverIcon,
  ArrowDownward as ArrowDownwardIcon,
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
  Remove as RemoveIcon,
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
  Savings as SavingsIcon,
  CreditCard as CreditCardIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';

interface AssetsDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: (dialogOpen: boolean) => void;
  setRestartDialogOpen: (restartDialogOpen: boolean) => void;
}

function AssetsDrawer({
  drawerOpen,
  setDrawerOpen,
  setRestartDialogOpen,
}: AssetsDrawerProps): JSX.Element {
  const {
    userData,
    config,
  } = useStateContext();

  return (
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
  );
}

export default AssetsDrawer;
