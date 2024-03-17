import { useCookies } from 'react-cookie';

import { useStateContext } from './StateContext';
import { url } from './Config';


function Requests() {
  const [cookies, setCookie] = useCookies(['JWT_TOKEN']);
  const {
    setMessage,
    setMessageOpen,
    setMessageSeverity,
  } = useStateContext();

  // CookieからJWTトークンを取得する関数
  const getCookieJwtToken = () => {
    return cookies['JWT_TOKEN'] || null;
  };

  // CookieにJWTトークンを登録する関数
  const setCookieJwtToken = (jwtToken: string) => {
    // トークンを「.」で分割してヘッダー、ペイロード、署名部分に分割
    const payloadBase64 = jwtToken.split('.')[1];
    // ペイロードをBase64デコードしてオブジェクトに変換
    const payload = JSON.parse(atob(payloadBase64));
    // UnixタイムスタンプをJavaScriptの日時に変換、30日後に変換
    const cookieExpiration = new Date(payload.exp * 1000 + 3600 * 24 * 30);
    setCookie('JWT_TOKEN', jwtToken, { path: '/', expires: cookieExpiration, secure: true, sameSite: 'strict' });
  };

  // パラメータリストを文字列に変換
  const createQueryString = (paramsList: Record<string, string>) => {
    const urlSearchParams = new URLSearchParams();
    // パラメータを追加
    for (const key in paramsList) {
      if (paramsList.hasOwnProperty(key)) {
        urlSearchParams.append(key, paramsList[key]);
      }
    }
    // URLSearchParamsを文字列に変換
    const queryString = urlSearchParams.toString();
    return queryString;
  };

  // GASにPOSTリクエストを送信
  const requests = async (paramsList: Record<string, string>) => {
    const cookieJwtToken = getCookieJwtToken();
    if (cookieJwtToken === null) {
      setMessage('サインインしてください。');
      setMessageSeverity('error');
      setMessageOpen(true);
      //window.location.href = 'https://MaitakeTeikoku.github.io/MaitakeAuth';
      
      return {
        result: false,
      };
    }

    // パラメータリストにJWTトークンを追加
    paramsList['jwtToken'] = cookieJwtToken;
    // パラメータリストをリクエスト用の文字列に変換
    const queryString = createQueryString(paramsList);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: queryString
    }

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      setMessage(data.message);
      if (data.result) {
        setCookieJwtToken(data.jwtToken);
        setMessageSeverity('success');
      } else {
        setMessageSeverity('warning');
      }
      setMessageOpen(true);

      return {
        result: true,
        data: data,
      };

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

      return {
        result: false,
      };
    }
  };

  return requests;
}

export default Requests;
