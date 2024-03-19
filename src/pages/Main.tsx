import { useState, useEffect } from 'react';
import {
  Container, Box,
  Tabs, Tab,
  Snackbar, Alert, AlertTitle,
  Backdrop,
} from '@mui/material';
import { Triangle } from 'react-loader-spinner';
import { useStateContext } from '../utils/StateContext';
import Requests from '../utils/Requests';
import { tabOptions } from '../utils/Config';
import Balance from './Balance';
import Search from './Search';
import Info from './Info';
import Help from './Help';

function Main(): JSX.Element {
  const {
    message,
    setMessage,
    messageOpen,
    setMessageOpen,
    messageSeverity,
    setMessageSeverity,
    isRunning,
    setIsRunning,
    setConfig,
    setUserData,
  } = useStateContext();
  const requests = Requests();

  const [tabValue, setTabValue] = useState<string>('balance');
  const [updateTime, setUpdateTime] = useState<Date | null>(null);

  // 画面が読み込まれたとき、ユーザ情報を取得
  useEffect(() => {
    (async () => {
      try {
        setIsRunning(true);

        setMessage('読み込み中...');
        setMessageSeverity('info');
        setMessageOpen(true);

        const paramsList: Record<string, string> = {
          action: 'user',
        };
        const returnValue = await requests(paramsList);

        if (returnValue.result) {
          setConfig(returnValue.data.config);
          setUserData(returnValue.data.userData);
          setUpdateTime(new Date());

          if (returnValue.data.initialize) {
            setTabValue('help');
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
    })()
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Container
        maxWidth='xs'
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(event, value) => setTabValue(value as string)}
          variant='fullWidth'
        >
          {tabOptions.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.title}
              icon={tab.icon}
            />
          ))}
        </Tabs>

        <Box sx={{ my: 2 }}>
          {tabValue === 'balance' &&
            <Balance
              updateTime={updateTime}
              setUpdateTime={setUpdateTime}
            />
          }

          {tabValue === 'search' &&
            <Search
              setUpdateTime={setUpdateTime}
            />
          }

          {tabValue === 'help' &&
            <Help />
          }

          {tabValue === 'info' &&
            <Info />
          }
        </Box>
      </Container>

      <Snackbar
        message={message}
        open={messageOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={
          (messageSeverity !== 'success')
            ? null
            : 6000
        }
        onClose={() => setMessageOpen(false)}
      >
        <Alert
          severity={messageSeverity}
          onClose={() => setMessageOpen(false)}
        >
          <AlertTitle>
            {messageSeverity.toUpperCase()}
          </AlertTitle>
          {message}
        </Alert>
      </Snackbar>

      <Backdrop
        open={isRunning}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 101
        }}
      >
        <Triangle
          color='white'
        />
      </Backdrop>
    </div >
  );
}

export default Main;
