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

function App() {
  const bannerWithHeader = (
    <Banner
      src={process.env.PUBLIC_URL + `/assets/images/banner.jpg`}
      alt="К весне готовы!"
    >
      <h2 className="banner-header">К весне готовы!</h2>
    </Banner>
  );

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <main className="main container">
        <div className="row">
          <div className="col">
            {bannerWithHeader}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog.html" element={<Catalog />} />
              <Route path="/catalog/:id.html" element={<Item />} />
              <Route path="/about.html" element={<About />} />
              <Route path="/contacts.html" element={<Contacts />} />
              <Route path="/cart.html" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
