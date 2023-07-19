import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCustomFetch from '@/hooks/useCustomFetch';
import { useCart } from '@/context/CartContext';
import Alert from '@/components/Alert';
import Preloader from '@/components/Preloader';
import './item.css';

export default function Item() {
  const [itemData, setItemData] = useState({});
  const [chosenSize, setChosenSize] = useState(null);
  const [count, setCount] = useState(1);
  const [loadingError, setLoadingError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { onProductAdd } = useCart();
  const { getItem } = useCustomFetch();

  useEffect(() => {
    getItem(params.id)
      .then((data) => setItemData(data))
      .catch((error) => setLoadingError(error));
  }, []);

  function handleButtonClick() {
    const { id, title, price } = itemData;
    const newProduct = {
      id,
      title,
      price,
      size: chosenSize,
      count,
    };

    onProductAdd(newProduct);

    navigate('/cart');
  }

  const {
    title,
    images,
    sku,
    manufacturer,
    color,
    material,
    season,
    reason,
    sizes,
  } = itemData;

  const itemBody = (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={images && images[0]} className="img-fluid" alt="" />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Размеры в наличии:&nbsp;
              {sizes &&
                sizes.map(({ size, avalible: available }) => {
                  return (
                    available && (
                      <span
                        key={size}
                        className={`item-size ${
                          chosenSize === size && 'item-size_selected'
                        }`}
                        onClick={() => setChosenSize(size)}
                      >
                        {size}
                      </span>
                    )
                  );
                })}
              *
            </p>
            <p>
              Количество:
              <span className="btn-group btn-group-sm pl-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCount(count - 1 >= 1 ? count - 1 : 1)}
                >
                  ‒
                </button>
                <button className="btn btn-outline-primary">{count}</button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setCount(count + 1 <= 10 ? count + 1 : 10)}
                >
                  +
                </button>
              </span>
            </p>
          </div>
          <span className="text-muted">
            {sizes
              ? '* кликните на размер и выберите количество'
              : '* доступных размеров нет'}
          </span>
          <button
            className="btn btn-danger btn-block btn-lg"
            onClick={handleButtonClick}
            disabled={!chosenSize}
          >
            В корзину
          </button>
        </div>
      </div>
    </section>
  );

  const error = loadingError && <Alert type="danger" text={loadingError} />;

  return getItem.loading ? <Preloader /> : error || itemBody;
}
