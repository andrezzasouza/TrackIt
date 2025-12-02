import { useState, useContext } from 'react';
import API from '../services/api/api';
import UserContext from '../contexts/UserContext';
import DayButton from './DayButton';

import { AddHabitStyle, ButtonHolder } from '../assets/styles/HabitsStyle';
import { InputStyle, DayHolder } from '../assets/styles/LogInSignUp';

export default function AddHabit({
  show,
  setShow,
  habitCallToServer,
  selectedDays,
  setSelectedDays
}) {
  const { userData, setDailyStats } = useContext(UserContext);

  const [task, setTask] = useState('');
  const [enabled, setEnabled] = useState(true);

  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  function addError() {
    alert('Algo deu errado. Tente novamente.');
    setEnabled(true);
  }

  function reloadPercentage(response) {
    const totalTasks = response.data.length;
    const amountDone = response.data.filter((amount) => amount.done).length;

    setDailyStats((amountDone * 100) / totalTasks);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  };

  function updatePercentage() {
    const promise = API.get('/habits/today', config);
    promise.then(reloadPercentage);
  }

  function hideBox() {
    setShow(false);
  }

  function addedHabit() {
    setEnabled(true);
    setSelectedDays([]);
    setTask('');
    hideBox();
    habitCallToServer(selectedDays);
    updatePercentage();
  }

  function createNewHabit(e) {
    setEnabled(false);
    e.preventDefault();

    const body = {
      name: task,
      days: selectedDays
    };

    if (selectedDays.length !== 0) {
      const promise = API.post('/habits', body, config);

      promise.then(addedHabit);
      promise.catch(addError);
    } else {
      alert('Escolha pelo menos 1 dia para realizar o hábito.');
      setEnabled(true);
    }
  }

  return (
    <AddHabitStyle visible={show}>
      <form onSubmit={createNewHabit}>
        <InputStyle
          clickable={enabled}
          placeholder="nome do hábito"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <DayHolder clickable={enabled}>
          {days.map((day, index) => (
            <DayButton
              key={index}
              day={day}
              index={index}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
          ))}
        </DayHolder>
        <ButtonHolder clickable={enabled}>
          <button type="button" onClick={hideBox}>
            Cancelar
          </button>
          <button type="submit">Salvar</button>
        </ButtonHolder>
      </form>
    </AddHabitStyle>
  );
}
