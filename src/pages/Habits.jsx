import { IoAddSharp } from 'react-icons/io5';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api/api';

import { MyHabits, Contents } from '../assets/styles/HabitsStyle';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import AddHabit from '../components/AddHabit';
import NoHabit from '../components/NoHabit';
import CreatedHabit from '../components/CreatedHabit';

import UserContext from '../contexts/UserContext';

export default function Habits() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [habitScreen, setHabitScreen] = useState('');
  const [show, setShow] = useState(false);

  const { userData } = useContext(UserContext);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  };

  function loadingError() {
    alert('Algo deu errado. Tente novamente.');
    navigate('/');
  }

  function addBox() {
    setShow(true);
  }

  function loadTasks(res) {
    if (res.data.length !== 0) {
      setHabitScreen(
        res.data.map((currentTask) => (
          <CreatedHabit
            currentTask={currentTask}
            habitCallToServer={habitCallToServer}
            key={currentTask.id}
          />
        ))
      );
    } else {
      setHabitScreen(<NoHabit />);
    }
  }

  function habitCallToServer() {
    const promise = API.get('/habits', config);
    promise.then(loadTasks);
    promise.catch(loadingError);
  }

  useEffect(() => {
    habitCallToServer();
  }, [selectedDays]);

  return (
    <Contents>
      <Header />
      <MyHabits>
        <h2>Meus hábitos</h2>
        <button onClick={() => addBox()} type="button" id="add">
          <IoAddSharp color="#FFFFFF" title="" font-size="25px" />
        </button>
      </MyHabits>
      <AddHabit
        show={show}
        setShow={setShow}
        habitCallToServer={habitCallToServer}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      {habitScreen}
      <FooterMenu />
    </Contents>
  );
}
