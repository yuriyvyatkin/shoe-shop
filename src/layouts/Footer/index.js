import CustomNavLink from '@/components/CustomNavLink';
import scrollUp from '@/utils/scrollUp';
import './footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer container bg-light">
      <div className="row">
        <div className="col">
          <section>
            <h5>Информация</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <CustomNavLink onClick={scrollUp} to="/about">
                  О магазине
                </CustomNavLink>
              </li>
              <li className="nav-item">
                <CustomNavLink onClick={scrollUp} to="/catalog">
                  Каталог
                </CustomNavLink>
              </li>
              <li className="nav-item">
                <CustomNavLink onClick={scrollUp} to="/contacts">
                  Контакты
                </CustomNavLink>
              </li>
            </ul>
          </section>
        </div>
        <div className="col">
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className="pay-cards d-flex">
              <div className="pay-card">
                <div className="pay-card__img american-express" />
              </div>
              <div className="pay-card">
                <div className="pay-card__img diners-club" />
              </div>
              <div className="pay-card">
                <div className="pay-card__img discover" />
              </div>
              <div className="pay-card">
                <div className="pay-card__img jcb" />
              </div>
              <div className="pay-card">
                <div className="pay-card__img mastercard" />
              </div>
              <div className="pay-card">
                <div className="pay-card__img mir" />
              </div>
              <div className="pay-card">
                <div className="pay-card__img visa" />
              </div>
            </div>
          </section>
          <section>
            <div className="copyright">
              2009-{currentYear} © BosaNoga — модный интернет-магазин обуви и
              аксессуаров. Все права защищены.
              <br />
              Доставка по всему миру!
            </div>
          </section>
        </div>
        <div className="col text-right">
          <section className="contacts">
            <h5>Контакты:</h5>
            <a className="contacts__phone" href="tel:+7-495-55-55-55">
              +7 (495) 55-55-55
            </a>
            <span className="contacts__working-hours">
              Ежедневно: с 09:00 до 21:00
            </span>
            <a
              className="contacts__email"
              href="mailto:office@bosanoga.ru"
            >
              office@bosanoga.ru
            </a>
            <div className="social-links">
              <div className="social-links__link vk" />
              <div className="social-links__link twitter" />
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
