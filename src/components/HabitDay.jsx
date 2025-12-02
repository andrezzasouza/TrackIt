import { useEffect, useState } from 'react';
import { DayButtonStyle } from '../assets/styles/LogInSignUp';

export default function HabitDay({ day, currentTaskDays, index }) {
  const [dayTask, setDayTask] = useState(false);

  useEffect(() => {
    currentTaskDays.find((daySelection) =>
      daySelection === index ? setDayTask(true) : dayTask
    );
  }, []);

  return (
    <DayButtonStyle clicked={dayTask} type="button">
      {day}
    </DayButtonStyle>
  );
}
