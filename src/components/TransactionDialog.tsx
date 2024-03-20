import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, Stepper, Step, StepLabel,
  TextField, IconButton, Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  Done as DoneIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';
import Requests from '../utils/Requests';
import { getCost } from '../utils/Config';

interface TransactionDialogProps {
  transactionDialogOpen: boolean;
  setTransactionDialogOpen: (transactionDialogOpen: boolean) => void;
  setDialogOpen: (dialogOpen: boolean) => void;
  ticker: string;
  stockPrice: number;
  isBuy: boolean;
}

function TransactionDialog({
  transactionDialogOpen,
  setTransactionDialogOpen,
  setDialogOpen,
  ticker,
  stockPrice,
  isBuy,
}: TransactionDialogProps): JSX.Element {
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
  const [activeStep, setActiveStep] = useState<number>(0);
  const [inputNumber, setInputNumber] = useState<any>(1);
  const [shareNumber, setShareNumber] = useState<number>(0);

  useEffect(() => {
    const parsedValue = parseInt(inputNumber);
    if (!isNaN(parsedValue)) {
      setShareNumber(parsedValue);
    } else {
      setShareNumber(0);
    }
  }, [inputNumber]);

  const clickBack = (): void => {
    if (activeStep <= 0) {
      setTransactionDialogOpen(false);
      setDialogOpen(true);
      setInputNumber(1);
      setActiveStep(0);
      return;
    }
    setActiveStep(activeStep - 1);
  }

  const clickNext = (): void => {
    if (activeStep >= stepList.length - 1) {
      setTransactionDialogOpen(false);
      setInputNumber(1);
      setActiveStep(0);
      return;
    }
    if (activeStep === 1) {
      const action = isBuy ? 'buy' : 'sell';
      clickTransaction(action);
      return;
    }
    setActiveStep(activeStep + 1);
  }

  const clickClose = (): void => {
    setTransactionDialogOpen(false);
    setInputNumber(1);
    setActiveStep(0);
  }

  const clickTransaction = async (action: string) => {
    try {
      setIsRunning(true);

      setMessage('読み込み中...');
      setMessageSeverity('info');
      setMessageOpen(true);

      const paramsList: Record<string, string> = {
        action: action,
        ticker: ticker,
        shareNumber: String(shareNumber),
      };
      const returnValue = await requests(paramsList);

      if (returnValue.result) {
        setConfig(returnValue.data.config);
        setUserData(returnValue.data.userData);
        setUpdateTime(new Date());
        if (returnValue.data.result) {
          setActiveStep(stepList.length - 1);
        } else {
          clickClose();
        }
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

  const transactionText = isBuy ? '購入' : '売却';
  const cost = getCost(true, stockPrice, shareNumber, config?.exchangeRate, config?.exchangeFee);
  const disabled = shareNumber <= 0
    || (!isBuy && ((userData?.stocks?.find((option: any) => option.ticker === ticker)?.stockNumber || 0) < shareNumber));

  const stepList = [
    {
      'id': 1,
      'label': `${transactionText}株数を入力`,
    }, {
      'id': 2,
      'label': `${transactionText}確認`,
    }, {
      'id': 3,
      'label': `${transactionText}完了`,
    }
  ];

  return (
    <Dialog
      onClose={clickClose}
      open={transactionDialogOpen}
    >
      <DialogTitle>
        {`${activeStep + 1}. ${stepList[activeStep].label}`}
      </DialogTitle>
      <DialogContent>
        <Grid container
          spacing={1}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Grid item xs={12}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
            >
              {stepList.map((step: any) => (
                <Step key={step.id}>
                  <StepLabel>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>

          <Grid item xs={12}
            sx={{
              textAlign: 'left',
              mt: 2,
            }}
          >
            <Typography
              sx={{ display: 'inline' }}
              component='span'
              variant='h5'
              color='text.primary'
            >
              {`${config?.stockOptions?.find((option: any) => option.ticker === ticker)?.tickerSymbol}`}
            </Typography>
            <Typography
              sx={{ display: 'inline' }}
              component='span'
              variant='body2'
              color='text.secondary'
            >
              {` ${config?.stockOptions?.find((option: any) => option.ticker === ticker)?.stockName}`}
            </Typography>
          </Grid>

          {activeStep === 0 ? (
            <>
              <Grid item xs={4}
                sx={{ mt: 2 }}
              >
                <Typography variant='body2'>
                  {'所有株数'}
                </Typography>
              </Grid>
              <Grid item xs={8}
                sx={{ mt: 2 }}
              >
                <Typography variant='body2'>
                  {`${userData?.stocks?.find((option: any) => option.ticker === ticker)?.stockNumber || 0}`}
                </Typography>
              </Grid>

              <Grid item xs={12}
                sx={{ mt: 2 }}
              >
                <TextField
                  label={`${transactionText}株数`}
                  type='number'
                  value={inputNumber}
                  onChange={(event) => setInputNumber(event.target.value)}
                  error={disabled}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}
                sx={{ mt: 2 }}
              >
                <Typography variant='body1'>
                  {`推定${transactionText}金額`}
                </Typography>
                <Typography variant='h6'>
                  {`￥ ${cost.toLocaleString()}`}
                </Typography>
              </Grid>

              <Grid item xs={12}
                sx={{ mt: 2 }}
              >
                <Typography variant='body1'>
                  {'推定口座残高'}
                </Typography>
                {isBuy ? (
                  <Typography variant='h6'
                    sx={{ color: ((userData.balance - cost) >= 0 ? 'success.main' : 'error.main') }}
                  >
                    {`￥ ${(userData.balance - cost)
                      .toLocaleString()}`}
                  </Typography>
                ) : (
                  <Typography variant='h6'>
                    {`￥ ${(userData.balance + cost)
                      .toLocaleString()}`}
                  </Typography>
                )}
              </Grid>
            </>
          ) : (
            <Grid item xs={12}
              sx={{ mt: 2 }}
            >
              <Typography variant='body1'>
                {`${transactionText}株数`}
              </Typography>
              <Typography variant='h5'>
                {shareNumber.toLocaleString()}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}
            sx={{ mt: 4 }}
          >
            {activeStep === 0 ? `${transactionText}株数を入力してね！`
              : activeStep === 1 ? `${transactionText}してもいい？`
                : `${transactionText}完了！`
            }
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: 'space-around' }}
      >
        {(activeStep >= stepList.length - 1) ? (
          <>
            <IconButton
              onClick={clickClose}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              onClick={clickBack}
            >
              <CloseIcon color='error' />
            </IconButton>
            <IconButton
              onClick={clickNext}
              disabled={disabled}
            >
              <DoneIcon color={disabled ? 'inherit' : 'success'} />
            </IconButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default TransactionDialog;
