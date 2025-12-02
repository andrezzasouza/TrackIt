import { HistoryContent, MyHistory } from '../assets/styles/HistoryStyle';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

export default function History() {
  return (
    <HistoryContent>
      <Header />
      <MyHistory>
        <h3>Histórico</h3>
        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
      </MyHistory>
      <FooterMenu />
    </HistoryContent>
  );
}
