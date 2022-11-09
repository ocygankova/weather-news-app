import { Hero, MainContextContainer, Navbar, News } from 'components';

function Main() {
  return (
    <>
      <Navbar hideOnPageLoad />

      <MainContextContainer component="main" maxWidth="md" marginTop={0}>
        <Hero />
        <News />
      </MainContextContainer>
    </>
  );
}

export default Main;
