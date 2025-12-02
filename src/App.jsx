import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './contexts/UserContext';

import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Habits from './pages/Habits';
import Today from './pages/Today';
import History from './pages/History';
import GlobalStyle from './assets/styles/GlobalStyle';

function App() {
  const [userData, setUserData] = useState('');
  const [dailyStats, setDailyStats] = useState(0);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, dailyStats, setDailyStats }}
    >
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route index element={<LogIn />} />
          <Route path="cadastro" element={<SignUp />} />
          <Route path="habitos" element={<Habits />} />
          <Route path="hoje" element={<Today />} />
          <Route path="historico" element={<History />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
