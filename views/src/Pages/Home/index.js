import Head from '../../Components/Head';
import Carousel from '../../Components/Carousel';
import News from '../../Components/News';
import Footer from '../../Components/Footer';



function Home() {
  return (
    <div id="shell">

     <Head />
     
      <div id="main">
        <Carousel />
        <Carousel />
        <Carousel />

        <News />

      </div>

      <Footer />
    </div>
  );
}

export default Home;
