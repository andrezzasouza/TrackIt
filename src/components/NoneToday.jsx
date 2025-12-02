import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { NoTodayStyle } from '../assets/styles/TodayStyle';

export default function NoneToday() {
  const { setDailyStats } = useContext(UserContext);
  setDailyStats(0);

  return (
    <NoTodayStyle>
      <p>
        Você não tem nenhum hábito hoje. Adicione um hábito no dia de hoje para
        trackear.
      </p>
    </NoTodayStyle>
  );
}
