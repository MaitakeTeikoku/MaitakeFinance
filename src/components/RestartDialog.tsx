import {
  Dialog, DialogTitle, DialogActions,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Done as DoneIcon,
} from '@mui/icons-material';
import { useStateContext } from '../utils/StateContext';
import Requests from '../utils/Requests';

interface RestartDialogProps {
  restartDialogOpen: boolean;
  setRestartDialogOpen: (dialogOpen: boolean) => void;
}

function RestartDialog({
  restartDialogOpen,
  setRestartDialogOpen,
}: RestartDialogProps): JSX.Element {
  const {
    setMessage,
    setMessageOpen,
    setMessageSeverity,
    setIsRunning,
    setConfig,
    setUserData,
    setUpdateTime,
  } = useStateContext();
  const requests = Requests();

  // リセットボタンが押されたとき、リスタートを実行
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

  return (
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
  );
}

export default RestartDialog;
