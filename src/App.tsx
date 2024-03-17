import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jaJP } from '@mui/material/locale';
import { CookiesProvider } from 'react-cookie';
import { StateProvider } from './utils/StateContext';
import Main from './components/Main';

function App() {
  const theme = createTheme(
    jaJP,
    {
      typography: {
        fontSize: 16,
        button: {
          textTransform: 'none'
        }
      },
      props: {
        MuiTextField: {
          variant: 'outlined'
        }
      },
    }
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <StateProvider>
            <Main />
          </StateProvider>
        </CookiesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
