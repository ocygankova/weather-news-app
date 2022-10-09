import { Hero, MainContextContainer, News } from 'components';

function Main() {
  return (
    <MainContextContainer component="main" maxWidth="md">
      <Hero />
      <News />
    </MainContextContainer>
  );
}

export default Main;
