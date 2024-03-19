import { createContext, useContext, useState } from 'react';

type Severity = 'error' | 'warning' | 'info' | 'success';
type State = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageOpen: boolean;
  setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messageSeverity: Severity;
  setMessageSeverity: React.Dispatch<React.SetStateAction<Severity>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  config: { [key: string]: any } ;
  setConfig: React.Dispatch<React.SetStateAction<{ [key: string]: any } >>;
  userData: { [key: string]: any } ;
  setUserData: React.Dispatch<React.SetStateAction<{ [key: string]: any } >>;
}
type StateProviderProps = {
  children: React.ReactNode;
}

const StateContext = createContext<State>({
  message: '',
  setMessage: () => { },
  messageOpen: false,
  setMessageOpen: () => { },
  messageSeverity: 'info',
  setMessageSeverity: () => { },
  isRunning: false,
  setIsRunning: () => { },
  config: {},
  setConfig: () => { },
  userData: {},
  setUserData: () => { },
});

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  const [messageSeverity, setMessageSeverity] = useState<Severity>('info');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [config, setConfig] = useState<{ [key: string]: any }>({
    "initialBalance": 0,
    "exchangeFee": 0,
    "tax": 0,
    "exchangeRate": 0,
    "exchangeRateYest": 0,
    "exchangeRateChange": 0,
    "exchangeRateChangepct": 0,
    "exchangeRateTime": "",
    "stockOptions": []
  });
  const [userData, setUserData] = useState<{ [key: string]: any }>({
    "userName": "",
    "date": "",
    "balance": 0,
    "stocks": [],
    "ticker": "",
    "stockPrice": 0,
    "stockCloseyest": 0,
    "totalAmount": 0,
    "totalProfit": 0,
    "totalNetProfit": 0,
    "totalAssets": 0,
  });

  const state = {
    message,
    setMessage,
    messageOpen,
    setMessageOpen,
    messageSeverity,
    setMessageSeverity,
    isRunning,
    setIsRunning,
    config,
    setConfig,
    userData,
    setUserData,
  };

  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};
