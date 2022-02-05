import './App.css';

import axios from 'axios';
import { useEffect } from 'react';
import logo from './logo.svg';
import { setAuthTokenCookie, setTenantIdCookie } from './services/cookie/cookieService';
import { httpRequest } from './services/httpService';

function App() {
  useEffect(async () => {
    var result = await httpRequest.post("https://localhost:44311/api/TokenAuth/Authenticate",{
      userNameOrEmailAddress:"admin",
      password:"123qwe",
      rememberClient:true
    })
    console.log(result.data.result);
    await setTenantIdCookie("1");
    await setAuthTokenCookie(result.data.result.accessToken, result.data.result.expireInSeconds);
  }, []);
  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
