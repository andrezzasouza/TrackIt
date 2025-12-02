import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { NoHabitStyle } from '../assets/styles/HabitsStyle';

export default function NoHabit() {
  const { setDailyStats } = useContext(UserContext);
  setDailyStats(0);

  return (
    <NoHabitStyle>
      <p>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </p>
    </NoHabitStyle>
  );
}
