import { IoCheckmark } from 'react-icons/io5';
import { useState, useContext } from 'react';
import API from '../services/api/api';

import UserContext from '../contexts/UserContext';
import {
  CheckButton,
  HighestStyle,
  CurrentStyle,
  TodayHabitStyle,
} from '../assets/styles/TodayStyle';

export default function TodayHabit({ dailyTask, todayCallToServer }) {
  const { userData } = useContext(UserContext);
  const [taskDone, setTaskDone] = useState(dailyTask.done);
  const [current, setCurrent] = useState(dailyTask.currentSequence);
  const [highest, setHighest] = useState(dailyTask.highestSequence);
  const [record, setRecord] = useState(
    current === highest && highest !== 0 && dailyTask.done === true,
  );

  function removeChecked() {
    setCurrent(current - 1);
    setHighest(highest - 1);
    setRecord(false);
    todayCallToServer();
  }

  function addChecked() {
    setCurrent(current + 1);
    setHighest(highest + 1);
    if (current === highest) {
      setRecord(true);
    }
    todayCallToServer();
  }
  function markAgain() {
    setTaskDone(!!taskDone);
    todayCallToServer();
  }

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  function configureAxios(taskId, taskStat) {
    const promise = API.post(`/habits/${taskId}/${taskStat}`, config);
    return promise;
  }

  function checkTask() {
    setTaskDone(!taskDone);
    if (dailyTask.done) {
      const promise = configureAxios(dailyTask.id, 'unchecked');
      promise.then(removeChecked);
      promise.catch(markAgain);
    } else {
      const promise = configureAxios(dailyTask.id, 'checked');
      promise.then(addChecked);
      promise.catch(markAgain);
    }
  }

  return (
    <TodayHabitStyle>
      <div>
        <h3>{dailyTask.name}</h3>
        <div>
          <p>
            Sequência atual:{' '}
            <CurrentStyle done={taskDone}>{current} dias</CurrentStyle>
          </p>
          <p>
            Seu recorde:{' '}
            <HighestStyle record={record}>{highest} dias</HighestStyle>
          </p>
        </div>
      </div>
      <CheckButton done={taskDone} onClick={() => checkTask()} id="done">
        <IoCheckmark
          color="#FFFFFF"
          title=""
          fontSize="56px"
          stroke="#FFFFFF"
        />
      </CheckButton>
    </TodayHabitStyle>
  );
}
