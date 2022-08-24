import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/common/Banner';
import Header from './components/header/Header';
import Home from './components/body/Home';
import Catalog from './components/body/Catalog/Catalog';
import Item from './components/body/Item';
import About from './components/body/About';
import Contacts from './components/body/Contacts';
import Cart from './components/body/Cart';
import NotFound from './components/body/NotFound';
import Footer from './components/footer/Footer';
import { Helmet } from "react-helmet";

function App() {
  const bannerWithHeader = (
    <Banner
      src={process.env.PUBLIC_URL + '/assets/images/banner.jpg'}
      alt="К весне готовы!"
      link={process.env.PUBLIC_URL + "/catalog?q=бежевый"}
    >
      <h2 className="banner-label">К весне готовы!</h2>
    </Banner>
  );

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <main className="main container">
        <div className="row">
          <div className="col">
            <Routes>
              <Route path="/" element={
                <>
                  {bannerWithHeader}
                  <Helmet>
                    <title>Bosa Noga</title>
                  </Helmet>
                  <Home />
                </>
              } />
              <Route path="/catalog" element={
                <>
                  <Helmet>
                    <title>Bosa Noga | Каталог </title>
                  </Helmet>
                  <Catalog />
                </>
              } />
              <Route path="/catalog/:id" element={<Item />} />
              <Route path="/about" element={
                <>
                  <Helmet>
                    <title>Bosa Noga | О магазине </title>
                  </Helmet>
                  <About />
                </>
              } />
              <Route path="/contacts" element={
                <>
                  <Helmet>
                    <title>Bosa Noga | Контакты </title>
                  </Helmet>
                  <Contacts />
                </>
              } />
              <Route path="/cart" element={
                <>
                  <Helmet>
                    <title>Bosa Noga | Корзина </title>
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
