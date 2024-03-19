import { useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Box, Grid, Typography, Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Input as InputIcon,
  Output as OutputIcon,
  DeleteForever as DeleteForeverIcon,
  CreditCard as CreditCardIcon,
  TrendingUp as TrendingUpIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
} from '@mui/icons-material';

function Help(): JSX.Element {
  const [expandAccordion, setExpandAccordion] = useState<string | false>('search');

  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandAccordion(isExpanded ? panel : false);
  };

  return (
    <div>
      <Box>
        <Divider />

        <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>
          {'できること'}
        </Typography>

        <Accordion
          expanded={expandAccordion === 'search'}
          onChange={handleAccordion('search')}
          sx={{ textAlign: 'start' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={2}>
                <SearchIcon color='primary' />
              </Grid>
              <Grid item xs={8}>
                {'銘柄の検索'}
              </Grid>
            </Grid>

          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                {'検索タブをクリックし、キーワードを入力して銘柄を探そう！'}
              </li>
              <li>
                {'気になる銘柄をクリックして株価を確認しよう！'}
              </li>
            </ol>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandAccordion === 'buy'}
          onChange={handleAccordion('buy')}
          sx={{ textAlign: 'start' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={2}>
                <InputIcon color='primary' />
              </Grid>
              <Grid item xs={8}>
                {'株の購入'}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                {'検索した銘柄の株価を確認し、購入ボタンをクリックしよう！資産タブに表示されている銘柄をクリックした後、購入ボタンをクリックしてもいいよ！'}
              </li>
              <li>
                {'購入する株数を入力して購入しよう！'}
              </li>
            </ol>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandAccordion === 'sell'}
          onChange={handleAccordion('sell')}
          sx={{ textAlign: 'start' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={2}>
                <OutputIcon color='primary' />
              </Grid>
              <Grid item xs={8}>
                {'株の売却'}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                {'資産タブをクリックし、所有している銘柄の利益が出ているか確認しよう！'}
              </li>
              <li>
                {'銘柄をクリックした後、売却ボタンをクリックしてね！'}
              </li>
              <li>
                {'売却する株数を入力して売却しよう！'}
              </li>
            </ol>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandAccordion === 'restart'}
          onChange={handleAccordion('restart')}
          sx={{ textAlign: 'start' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={2}>
                <DeleteForeverIcon color='primary' />
              </Grid>
              <Grid item xs={8}>
                {'資産のリセット'}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                {'資産タブの資産をタップして、ゴミ箱ボタンをクリックするとリセットできるよ！'}
              </li>
            </ol>
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ mt: 2 }} />
      </Box>

      <Box>
        <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>
          {'ルール'}
        </Typography>

        <Accordion
          expanded={expandAccordion === 'stock'}
          onChange={handleAccordion('stock')}
          sx={{ textAlign: 'start' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={2}>
                <CreditCardIcon color='primary' />
              </Grid>
              <Grid item xs={8}>
                {'銘柄'}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                {'米国市場のみ取り扱っているよ！'}
              </li>
              <li>
                {'一般的な日本人が知っていそうな企業を厳選しているよ！'}
              </li>
              <li>
                {'米国市場に上場している日本企業はすべて取り扱っているよ！'}
              </li>
              <li>
                {'最低1株から購入できるよ！（本来は、日本市場は基本100株単位、米国は1株単位）'}
              </li>
            </ol>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandAccordion === 'stockPrice'}
          onChange={handleAccordion('stockPrice')}
          sx={{ textAlign: 'start' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={2}>
                <TrendingUpIcon color='primary' />
              </Grid>
              <Grid item xs={8}>
                {'株価'}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                {'為替と為替手数料が反映された日本円での値が表示されているよ！'}
              </li>
              <li>
                {'リアルタイムの値を取得してるよ！'}
              </li>
              <li>
                {'前日の終値と、前日の終値からの変動・変動率も表示しているよ！'}
              </li>
            </ol>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandAccordion === 'exchangeRate'}
          onChange={handleAccordion('exchangeRate')}
          sx={{ textAlign: 'start' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={2}>
                <CurrencyExchangeIcon color='primary' />
              </Grid>
              <Grid item xs={8}>
                {'為替'}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                {'毎日午前9時から午前10時までの間のランダムなタイミングで更新されるよ！（本来は、午前9時55分）'}
              </li>
              <li>
                {'為替手数料は一定にしているよ！'}
              </li>
            </ol>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandAccordion === 'profit'}
          onChange={handleAccordion('profit')}
          sx={{ textAlign: 'start' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={2}>
                <KeyboardDoubleArrowUpIcon color='primary' />
              </Grid>
              <Grid item xs={8}>
                {'利益'}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                {'もし利益が出ても税金はとられないよ！（本来は、損益通算して利益があれば納税）'}
              </li>
              <li>
                {'株の売買に手数料は無料だよ！（本来は、手数料が無料の証券会社も多い）'}
              </li>
              <li>
                {'配当金（インカムゲイン）は入手できないよ！'}
              </li>
              <li>
                {'譲渡金（キャピタルゲイン）だけで利益を出そう！'}
              </li>
            </ol>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}

export default Help;
