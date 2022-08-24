import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import CustomNavLink from '../common/CustomNavLink';
import { AppContext } from '../AppContext';

export default function Header() {
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [form, setForm] = useState({ query: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const app = useContext(AppContext);
  const { cart } = app;

  useEffect(() => {
    setSearchVisibility(false);
  }, [location.pathname]);

  function toggleSearchVisibility(event) {
    event.preventDefault();

    if (searchVisibility && form.query.trim() !== '') {
      setForm({ query: '' });

      navigate(`/catalog?q=${form.query}`);
    }

    setSearchVisibility((prevState) => !prevState);
  }

  function handleInputChange({ target }) {
    const { name, value } = target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <CustomNavLink className="navbar-brand" to="/">
              <img
                src={process.env.PUBLIC_URL + `/assets/images/header-logo.png`}
                alt="Bosa Noga"
              />
            </CustomNavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <CustomNavLink to="/">Главная</CustomNavLink>
                </li>
                <li className="nav-item">
                  <CustomNavLink to="/catalog">Каталог</CustomNavLink>
                </li>
                <li className="nav-item">
                  <CustomNavLink to="/about">О магазине</CustomNavLink>
                </li>
                <li className="nav-item">
                  <CustomNavLink to="/contacts">Контакты</CustomNavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={toggleSearchVisibility}
                  />
                  <div className="header-controls-pic header-controls-cart">
                    <div
                      className={`header-controls-cart-full ${
                        !cart.length && 'invisible'
                      }`}
                    >
                      {cart.length}
                    </div>
                    <div className="header-controls-cart-menu">
                      <Link
                        className="header-controls-cart-link"
                        to="/cart"
                      />
                    </div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${
                    !searchVisibility && 'invisible'
                  }`}
                  onSubmit={toggleSearchVisibility}
                >
                  <input
                    className="form-control"
                    name="query"
                    value={form.query}
                    onChange={handleInputChange}
                    placeholder="Ваш запрос"
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
