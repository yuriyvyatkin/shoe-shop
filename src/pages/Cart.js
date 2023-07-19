import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCustomFetch from '@/hooks/useCustomFetch';
import { useCart } from '@/context/CartContext';
import Alert from '@/components/Alert';
import Preloader from '@/components/Preloader';

export default function Cart() {
  const [response, setResponse] = useState(null);
  const { postItems } = useCustomFetch();
  const { cart, onProductDelete, onCartClear } = useCart();
  let cartItems = null;
  let totalPrice = 0;

  function handleFormSubmit(event) {
    event.preventDefault();

    const { phone, address } = event.target.elements;

    const body = {
      owner: {
        phone: phone.value,
        address: address.value,
      },
      items: cart.map(({ id, price, count }) => ({ id, price, count })),
    };

    postItems(body)
      .then(() => {
        setResponse(<Alert type="success" text={'Ваш заказ оформлен!'} />);
        onCartClear();
      })
      .catch((error) => setResponse(<Alert type="danger" text={error} />));
  }

  if (cart.length) {
    cartItems = cart.map((cartItem, index) => {
      const { id, title, price, size, count } = cartItem;
      const total = count * price;
      totalPrice += total;

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <Link to={`/products/${id}`}>{title}</Link>
          </td>
          <td>{size}</td>
          <td>{count}</td>
          <td>{price} руб.</td>
          <td>{total} руб.</td>
          <td>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onProductDelete(index)}
            >
              Удалить
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cartItems}
            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              <td>{totalPrice} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      {postItems.uploading ? (
        <Preloader />
      ) : (
        response || (
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div
              className="card"
              style={{ maxWidth: '30rem', margin: '0 auto' }}
            >
              <form className="card-body" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-control"
                    id="phone"
                    placeholder="Ваш телефон"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-control"
                    id="address"
                    placeholder="Адрес доставки"
                    required
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                    required
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Согласен с правилами доставки
                  </label>
                </div>
                <button type="submit" className="btn btn-outline-secondary">
                  Оформить
                </button>
              </form>
            </div>
          </section>
        )
      )}
    </>
  );
}
