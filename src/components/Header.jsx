import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Heading } from '../assets/styles/HeaderStyle';

export default function Header() {
  const { userData } = useContext(UserContext);

  return (
    <Heading>
      <h1>TrackIt</h1>
      <img src={userData.image} alt={`Foto de ${userData.name}`} />
    </Heading>
  );
}
