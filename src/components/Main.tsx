import { useState } from 'react';
import {
  Sheet, Grid,
  Typography, Input,
  Button,
} from '@mui/joy/';

function Main() {
  // 証券コード
  const [tickerSymbol, setTickerSymbol] = useState<string>('');
  const [chart, setChart] = useState<any>(null);

  // 証券コードを受け取ってチャートを表示
  const loadChart = async (): Promise<void> => {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${tickerSymbol}.T`
    try {
      const response = await fetch(url, {
        mode: "no-cors",
      });
      console.log(response);
      const data = await response.json();
      setChart(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <Grid container
          spacing={2}
          justifyContent='center'
          alignItems='center'
          style={{ textAlign: 'center' }}
        >
          <Grid xs={4}>
            <Typography>
              {'証券コード'}
            </Typography>
          </Grid>
          <Grid xs={8}>
            <Input
              value={tickerSymbol}
              onChange={(event) => setTickerSymbol(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          onClick={loadChart}
        >
          {'検索'}
        </Button>
      </Sheet>

      <Sheet>
        {chart}
      </Sheet>
    </div>
  );
}

export default Main;