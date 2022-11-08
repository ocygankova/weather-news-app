import { Hero, MainContextContainer, News } from 'components';

function Main() {
  return (
    <MainContextContainer component="main" maxWidth="md" marginTop={0}>
      <Hero />
      <News />
    </MainContextContainer>
  );
}

export default Main;
