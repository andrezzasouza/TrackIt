import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api/api';
import NoneToday from '../components/NoneToday';
import TodayHabit from '../components/TodayHabit';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import { TodayContents, ThisDate, Subtitle } from '../assets/styles/TodayStyle';
import UserContext from '../contexts/UserContext';

export default function Today() {
  const today = dayjs().locale('pt-br').format('dddd, DD/MM');

  const navigate = useNavigate();
  const { userData, dailyStats, setDailyStats } = useContext(UserContext);
  
  const [subtitle, setSubtitle] = useState(false);
  const [todayScreen, setTodayScreen] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  };

  function loadError() {
    alert('Algo deu errado.');
    navigate('/');
  }

  function loadToday(res) {
    if (res.data.length !== 0) {
      setTodayScreen(
        res.data.map((dailyTask) => (
          <TodayHabit
            dailyTask={dailyTask}
            key={dailyTask.id}
            todayCallToServer={todayCallToServer}
          />
        ))
      );
    } else {
      setTodayScreen(<NoneToday />);
    }

    const totalTasks = res.data.length;
    const amountDone = res.data.filter((amount) => amount.done).length;

    setDailyStats((amountDone * 100) / totalTasks);
    setSubtitle(res.data.length !== 0);
  }

  function todayCallToServer() {
    const promise = API.get('/habits/today', config);

    promise.then(loadToday);
    promise.catch(loadError);
  }

  useEffect(() => {
    todayCallToServer();
  }, []);

  return (
    <TodayContents>
      <Header />
      <ThisDate>
        <h2>{today}</h2>
        <Subtitle done={subtitle}>
          {subtitle
            ? `${parseInt(dailyStats, 10)}% dos hábitos concluídos`
            : 'Nenhum hábito concluído ainda'}
        </Subtitle>
      </ThisDate>
      {todayScreen}
      <FooterMenu />
    </TodayContents>
  );
}
