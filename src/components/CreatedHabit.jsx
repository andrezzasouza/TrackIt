import { IoTrashOutline } from 'react-icons/io5';
import { useContext } from 'react';
import API from '../services/api/api';
import { DayHolder } from '../assets/styles/LogInSignUp';
import UserContext from '../contexts/UserContext';
import { CreatedHabitStyle, IconHolder } from '../assets/styles/HabitsStyle';
import HabitDay from './HabitDay';

export default function CreatedHabit({ currentTask, habitCallToServer }) {
  const { userData, setDailyStats } = useContext(UserContext);
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  };

  function reloadPercentage(response) {
    const totalTasks = response.data.length;
    const amountDone = response.data.filter((amount) => amount.done).length;

    setDailyStats((amountDone * 100) / totalTasks);
  }

  function updatePercentage() {
    const promise = API.get('/habits/today', config);

    promise.then(reloadPercentage);
  }

  function taskDeleted() {
    habitCallToServer();
    updatePercentage();
  }

  function deleteTask() {
    const deleteHabit = window.confirm(
      'Você realmente quer deletar esse hábito?'
    );
    if (deleteHabit) {
      const promise = API.delete(`/habits/${currentTask.id}`, config);
      promise.then(taskDeleted);
      promise.catch(() => 'Algo deu errado. Tente novamente.');
    }
  }

  return (
    <CreatedHabitStyle>
      <p>{currentTask.name}</p>
      <IconHolder onClick={() => deleteTask()} id="trash">
        <IoTrashOutline color="#666666" />
      </IconHolder>
      <DayHolder>
        {days.map((day, index) => (
          <HabitDay
            day={day}
            key={index}
            index={index}
            currentTaskDays={currentTask.days}
          />
        ))}
      </DayHolder>
    </CreatedHabitStyle>
  );
}
