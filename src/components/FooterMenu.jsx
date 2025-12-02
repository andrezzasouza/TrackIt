import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UserContext from '../contexts/UserContext';
import { Footer } from '../assets/styles/FooterMenuStyle';

export default function FooterMenu() {
  const { dailyStats } = useContext(UserContext);

  return (
    <Footer>
      <Link to="/habitos">
        <p>Hábitos</p>
      </Link>
      <Link to="/hoje">
        <div>
          <CircularProgressbar
            value={dailyStats}
            text="Hoje"
            styles={buildStyles({
              pathColor: '#FFF',
              textColor: '#FFF',
              trailColor: 'transparent',
              textSize: '17.976px',
              lineHeigh: '22px'
            })}
          />
        </div>
      </Link>
      <Link to="/historico">
        <p>Histórico</p>
      </Link>
    </Footer>
  );
}
