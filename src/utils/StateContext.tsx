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
    "initialBalance": 10000000,
    "exchangeFee": 1,
    "tax": 0.20315,
    "exchangeRate": 148.751,
    "exchangeRateYest": 148.487,
    "exchangeRateChange": 0.265,
    "exchangeRateChangepct": 0.178,
    "exchangeRateTime": "2024-03-16T08:36:22.353Z",
    "stockOptions": [
      {
       "tickerSymbol": "AAPL",
       "exchangeSymbol": "NASDAQ",
       "ticker": "NASDAQ:AAPL",
       "url": "https://www.google.com/finance/quote/AAPL:NASDAQ",
       "stockName": "Apple Inc",
       "stockNameJa": "アップル社",
       "japan": false
      },{
        "tickerSymbol": "GOOG",
        "exchangeSymbol": "NASDAQ",
        "ticker": "NASDAQ:GOOG",
        "url": "https://www.google.com/finance/quote/GOOG:NASDAQ",
        "stockName": "Alphabet Inc Class C",
        "stockNameJa": "Alphabet Inc クラス C",
        "japan": true
       },
    ]
  });
  const [userData, setUserData] = useState<{ [key: string]: any }>({
    "userName": "a",
    "date": "2024-03-16T07:33:01.261Z",
    "balance": 5276701,
    "stocks": [
      {
        "ticker": "NASDAQ:GOOG",
        "stockNumber": 100,
        "cost": 2133204,
        "stockPrice": 142.17,
        "stockCloseyest": 144.34,
        "stockPriceJpy": 21190,
        "stockCloseyestJpy": 21514,
        "stockChange": -2.17,
        "stockChangeJpy": -323,
        "stockChangepct": -1.5,
        "stockChangepctJpy": -1.5,
        "amount": 2104770,
        "profit": -28434,
        "netProfit": -28434
      },
      {
        "ticker": "NASDAQ:AAPL",
        "stockNumber": 100,
        "cost": 2590095,
        "stockPrice": 172.62,
        "stockCloseyest": 173,
        "stockPriceJpy": 25729,
        "stockCloseyestJpy": 25785,
        "stockChange": -0.37,
        "stockChangeJpy": -56,
        "stockChangepct": -0.21,
        "stockChangepctJpy": -0.21,
        "amount": 2555571,
        "profit": -34524,
        "netProfit": -34524
      }
    ],
    "ticker": "NASDAQ:AAPL",
    "stockPrice": 172.62,
    "stockCloseyest": 173,
    "totalAmount": 4660341,
    "totalProfit": -62958,
    "totalNetProfit": -62958,
    "totalAssets": 9937042,
    
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
