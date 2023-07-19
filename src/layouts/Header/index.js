import CustomNavLink from '@/components/CustomNavLink';
import { useCart } from '@/context/CartContext';
import logo from '@/images/logo.jpg';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

export default function Header() {
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [form, setForm] = useState({ query: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

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
    <header className="header container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm bg-light">
            <CustomNavLink className="navbar-brand" to="/">
              <img
                src={logo}
                alt="Bosa Noga"
              />
            </CustomNavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="nav-items navbar-nav mr-auto">
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
                <div className="controls">
                  <div
                    data-id="search-expander"
                    className="control control__search"
                    onClick={toggleSearchVisibility}
                  />
                  <div className="control control__cart">
                    <div
                      className={`cart__items ${
                        !cart.length && 'cart__items_invisible'
                      }`}
                    >
                      {cart.length}
                    </div>
                    <div>
                      <Link
                        className="cart__link"
                        to="/cart"
                      />
                    </div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`search-form ${
                    !searchVisibility && 'search-form_invisible'
                  }`}
                  onSubmit={toggleSearchVisibility}
                >
                  <input
                    className="search-form__input"
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
