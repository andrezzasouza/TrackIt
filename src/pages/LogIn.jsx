import { ThreeDots } from 'react-loader-spinner';

import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import API from '../services/api/api';
import UserContext from '../contexts/UserContext';
import {
  Container,
  Logo,
  InputStyle,
  BigButton,
  Alternate,
} from '../assets/styles/LogInSignUp';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(true);

  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  function enter(response) {
    setUserData(response.data);
    navigate('/hoje');
    setEmail('');
    setPassword('');
    setEnabled(true);
  }

  function tryAgain() {
    alert('Algo deu errado. Tente novamente.');
    setEnabled(true);
  }

  function prepareBody() {
    const body = {
      email,
      password,
    };
    return body;
  }

  function loggingIn(e) {
    e.preventDefault();
    setEnabled(false);

    const promise = API.post('/auth/login', prepareBody());
    promise.then(enter);
    promise.catch(tryAgain);
  }

  return (
    <Container>
      <Logo src="./trackit.png" alt="Logo do TrackIt" />
      <form onSubmit={loggingIn}>
        <InputStyle
          clickable={enabled}
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputStyle
          clickable={enabled}
          placeholder="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <BigButton type="submit" clickable={enabled}>
          {enabled ? (
            'Entrar'
          ) : (
            <ThreeDots color="#FFFFFF" height={45} width={51} />
          )}
        </BigButton>
      </form>
      <Link to={enabled ? '/cadastro' : ''}>
        <Alternate>Não tem uma conta? Cadastre-se!</Alternate>
      </Link>
    </Container>
  );
}
