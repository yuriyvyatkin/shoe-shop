import bannerImage from '@/images/banner.jpg';
import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import About from './pages/About';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import Item from './pages/Item';
import NotFound from './pages/NotFound';

function App() {
  const bannerWithHeader = (
    <Banner
      src={bannerImage}
      alt="К весне готовы!"
      link={'/catalog?q=бежевый'}
    >
      <h2 className="banner__label">К весне готовы!</h2>
    </Banner>
  );
  const siteName = 'Bosa Noga';

  return (
    <Router>
      <Header />
      <main className="main container">
        <div className="row">
          <div className="col">
            <Routes>
              <Route path="/" element={
                <>
                  {bannerWithHeader}
                  <Helmet>
                    <title>{siteName}</title>
                  </Helmet>
                  <Home />
                </>
              } />
              <Route path="/catalog" element={
                <>
                  <Helmet>
                    <title>{`${siteName} | Каталог`}</title>
                  </Helmet>
                  <Catalog />
                </>
              } />
              <Route path="/catalog/:id" element={<Item />} />
              <Route path="/about" element={
                <>
                  <Helmet>
                    <title>{`${siteName} | О магазине`}</title>
                  </Helmet>
                  <About />
                </>
              } />
              <Route path="/contacts" element={
                <>
                  <Helmet>
                    <title>{`${siteName} | Контакты`}</title>
                  </Helmet>
                  <Contacts />
                </>
              } />
              <Route path="/cart" element={
                <>
                  <Helmet>
                    <title>{`${siteName} | Корзина`}</title>
                  </Helmet>
                  <Cart />
                </>
              } />
              <Route path="*" element={
                <>
                  <Helmet>
                    <title>Ошибка 404</title>
                  </Helmet>
                  <NotFound />
                </>
              } />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
