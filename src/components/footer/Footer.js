import CustomNavLink from '../common/CustomNavLink';
import scrollUp from '../../functions/scrollUp';

export default function Footer() {
  return (
    <footer className="footer container bg-light">
      <div className="row">
        <div className="col">
          <section>
            <h5>Информация</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <CustomNavLink onClick={scrollUp} to="/about.html">
                  О магазине
                </CustomNavLink>
              </li>
              <li className="nav-item">
                <CustomNavLink onClick={scrollUp} to="/catalog.html">
                  Каталог
                </CustomNavLink>
              </li>
              <li className="nav-item">
                <CustomNavLink onClick={scrollUp} to="/contacts.html">
                  Контакты
                </CustomNavLink>
              </li>
            </ul>
          </section>
        </div>
        <div className="col">
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className="footer-pay">
              <div className="footer-pay-systems footer-pay-systems-paypal" />
              <div className="footer-pay-systems footer-pay-systems-master-card" />
              <div className="footer-pay-systems footer-pay-systems-visa" />
              <div className="footer-pay-systems footer-pay-systems-yandex" />
              <div className="footer-pay-systems footer-pay-systems-webmoney" />
              <div className="footer-pay-systems footer-pay-systems-qiwi" />
            </div>
          </section>
          <section>
            <div className="footer-copyright">
              2009-2022 © BosaNoga.ru — модный интернет-магазин обуви и
              аксессуаров. Все права защищены.
              <br />
              Доставка по всей России!
            </div>
          </section>
        </div>
        <div className="col text-right">
          <section className="footer-contacts">
            <h5>Контакты:</h5>
            <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">
              +7 495 79 03 5 03
            </a>
            <span className="footer-contacts-working-hours">
              Ежедневно: с 09-00 до 21-00
            </span>
            <a
              className="footer-contacts-email"
              href="mailto:office@bosanoga.ru"
            >
              office@bosanoga.ru
            </a>
            <div className="footer-social-links">
              <div className="footer-social-link footer-social-link-twitter" />
              <div className="footer-social-link footer-social-link-vk" />
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
