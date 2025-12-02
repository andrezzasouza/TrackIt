import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import API from '../services/api/api';
import {
  Container,
  Logo,
  InputStyle,
  BigButton,
  Alternate
} from '../assets/styles/LogInSignUp';

export default function SignUp() {
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createName, setCreateName] = useState('');
  const [createPhoto, setCreatePhoto] = useState('');
  const [enabled, setEnabled] = useState(true);

  const navigate = useNavigate();

  function createUser() {
    navigate('/');
    setCreateEmail('');
    setCreatePassword('');
    setCreateName('');
    setCreatePhoto('');
    setEnabled(true);
  }

  function creationError() {
    alert('Algo deu errado. Tente novamente.');
    setEnabled(true);
  }

  function prepareBody() {
    const body = {
      email: createEmail,
      name: createName,
      image: createPhoto,
      password: createPassword
    };
    return body;
  }

  function signingUp(e) {
    e.preventDefault();
    setEnabled(false);

    const promise = API.post('/auth/sign-up', prepareBody());
    promise.then(createUser);
    promise.catch(creationError);
  }

  return (
    <Container>
      <Logo src="./trackit.png" alt="Logo do TrackIt" />
      <form onSubmit={signingUp}>
        <InputStyle
          clickable={enabled}
          placeholder="email"
          type="email"
          value={createEmail}
          onChange={(e) => setCreateEmail(e.target.value)}
          required
        />
        <InputStyle
          clickable={enabled}
          placeholder="senha"
          type="password"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
          required
        />
        <InputStyle
          clickable={enabled}
          placeholder="nome"
          type="text"
          value={createName}
          onChange={(e) => setCreateName(e.target.value)}
          required
        />
        <InputStyle
          clickable={enabled}
          placeholder="foto"
          type="url"
          value={createPhoto}
          onChange={(e) => setCreatePhoto(e.target.value)}
          required
        />
        <BigButton type="submit" clickable={enabled}>
          {enabled ? (
            'Cadastrar'
          ) : (
            <ThreeDots color="#FFFFFF" height={45} width={51} />
          )}
        </BigButton>
      </form>
      <Link to={enabled ? '/' : ''}>
        <Alternate>Já tem uma conta? Faça login!</Alternate>
      </Link>
    </Container>
  );
}
